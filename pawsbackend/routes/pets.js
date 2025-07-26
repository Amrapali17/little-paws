const express = require('express');
const router = express.Router();
const Pet = require('../models/pet');
const multer = require('multer');
const path = require('path');
const sharp = require('sharp');
const fs = require('fs');

// Multer storage setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Save files to /uploads folder
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// POST /api/pets — Add a pet with file upload and convert HEIC to JPG
router.post('/', upload.single('photo'), async (req, res) => {
  try {
    let photoUrl = '';

    if (req.file) {
      const inputPath = req.file.path; // original uploaded file
      const outputFilename = req.file.filename.replace(/\.[^/.]+$/, ".jpg"); // change extension to .jpg
      const outputPath = path.join('uploads', outputFilename);

      // Convert uploaded file (HEIC or any) to JPG using sharp
      await sharp(inputPath)
        .jpeg({ quality: 90 })
        .toFile(outputPath);

      // Delete original file (HEIC or original format)
      fs.unlinkSync(inputPath);

      photoUrl = `/uploads/${outputFilename}`;
    }

    const pet = new Pet({
      name: req.body.name,
      type: req.body.type,
      breed: req.body.breed, 
      age: req.body.age,
      description: req.body.description,
      location: req.body.location,
      photoUrl
    });

    await pet.save();
    res.status(201).json({ success: true, pet });
  } catch (err) {
    res.status(400).json({ success: false, message: 'Failed to add pet', error: err.message });
  }
});

// GET /api/pets — list all pets
router.get('/', async (req, res) => {
  try {
    const pets = await Pet.find().sort({ createdAt: -1 });
    res.json({ success: true, pets });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch pets', error: err.message });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Adoption = require('../models/adoption');
const adminAuth = require('../middleware/authadmin'); // if used, else remove

// GET all adoptions (admin only)
router.get('/', adminAuth, async (req, res) => {
  try {
    const adoptions = await Adoption.find().sort({ createdAt: -1 });
    res.json({ adoptions });
  } catch (err) {
    console.error('Failed to fetch adoptions:', err);
    res.status(500).json({ error: 'Failed to fetch adoptions' });
  }
});

// Public POST route to submit adoption request
router.post('/', async (req, res) => {
  try {
    const { name, email, reason, pet } = req.body; // include pet if needed
    const newAdoption = new Adoption({ name, email, reason, pet });
    await newAdoption.save();
    res.json({ success: true, message: 'Adoption submitted' });
  } catch (err) {
    console.error('Adoption submission error:', err);
    res.status(500).json({ error: 'Failed to submit adoption' });
  }
});

module.exports = router;

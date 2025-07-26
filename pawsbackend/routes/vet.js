const express = require('express');
const router = express.Router();
const VetBooking = require('../models/VetBooking');
const authMiddleware = require('../middleware/auth');
const { sendBookingConfirmation } = require('../utils/mailer'); // Email sender

// POST /api/vet/book - Book a vet appointment
router.post('/book', authMiddleware, async (req, res) => {
  try {
    const { petName, date, reason } = req.body;

    // Validate inputs
    if (!petName || !date || !reason) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Save booking in MongoDB
    const booking = new VetBooking({
      userId: req.user.id, // Make sure your authMiddleware attaches user info
      petName,
      date,
      reason
    });
    await booking.save();

    // Send confirmation email to user
    try {
      await sendBookingConfirmation(req.user.email, petName, date, reason);
    } catch (emailErr) {
      console.error('Email failed to send:', emailErr.message);
      // Don't fail booking if email fails
    }

    res.status(201).json({ success: true, message: "Booking confirmed!", booking });
  } catch (err) {
    res.status(500).json({ success: false, message: "Booking failed", error: err.message });
  }
});

// GET /api/vet/services - Fetch available services (currently hardcoded)
router.get('/services', (req, res) => {
  res.json({
    success: true,
    services: [
      { id: 1, name: 'General Checkup', price: 500 },
      { id: 2, name: 'Vaccination', price: 800 },
      { id: 3, name: 'Dental Cleaning', price: 1500 }
    ]
  });
});

module.exports = router;

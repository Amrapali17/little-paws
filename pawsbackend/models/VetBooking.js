// models/VetBooking.js
const mongoose = require('mongoose');

const vetBookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  petName: { type: String, required: true },
  date: { type: Date, required: true },
  reason: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('VetBooking', vetBookingSchema);

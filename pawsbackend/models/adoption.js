const mongoose = require('mongoose');

const adoptionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  reason: { type: String, required: true },
  pet: { type: String, required: true },  // Add this line
}, { timestamps: true });

module.exports = mongoose.model('Adoption', adoptionSchema);

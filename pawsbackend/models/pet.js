const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: String,
  breed: String,
  age: Number,
  description: String,
  photoUrl: String,
  status: { type: String, default: 'available' },
  location: String,
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Pet', petSchema);

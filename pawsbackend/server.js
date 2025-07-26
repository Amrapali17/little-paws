const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');
const express = require('express');
const app = require('./app');

// Serve static files from "pawsfrontend" so you can access home.html
app.use(express.static(path.join(__dirname, 'pawsfrontend')));

// Default route (optional) → loads home.html by default
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'pawsfrontend', 'home.html'));
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`🌐 Open http://localhost:${PORT}/home.html`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });

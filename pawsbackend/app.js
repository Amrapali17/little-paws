const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();
const app = express();

// CORS settings
const allowedOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://localhost:5000',
  'http://127.0.0.1:5000',
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'), false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const petRoutes = require('./routes/pets');
const adoptionRoutes = require('./routes/adoption');
const vetRoutes = require('./routes/vet');  // <-- ADD THIS

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/pets', petRoutes);
app.use('/api/adoptions', adoptionRoutes);
app.use('/api/vet', vetRoutes);  // <-- ADD THIS

module.exports = app;

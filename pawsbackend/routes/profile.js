const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const User = require('../models/User');

// GET /profile - Fetch user profile
router.get('/', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Profile fetched successfully',
      user,
    });
  } catch (err) {
    console.error('Profile GET error:', err);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: err.message,
    });
  }
});

module.exports = router;

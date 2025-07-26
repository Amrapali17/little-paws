const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Make sure this path is correct

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user email from DB
    const user = await User.findById(decoded.id).select('id email');
    if (!user) {
      return res.status(401).json({ success: false, message: 'Unauthorized: User not found' });
    }

    req.user = {
      id: user.id,
      email: user.email
    };

    next();
  } catch (err) {
    console.error('[Auth Error]', err.message);
    return res.status(401).json({ success: false, message: 'Unauthorized: Invalid token' });
  }
};

module.exports = authMiddleware;

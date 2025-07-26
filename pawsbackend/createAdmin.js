const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const adminExists = await User.findOne({ email: 'admin@littlepaws.com' });
    if (adminExists) {
      console.log('Admin already exists.');
      process.exit(0);
    }

    const admin = new User({
      fullName: 'Admin User',
      email: 'admin@littlepaws.com',
      password: 'admin123', // default password
      isAdmin: true,
    });

    await admin.save();
    console.log('✅ Admin created');
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

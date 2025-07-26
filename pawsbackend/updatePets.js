const mongoose = require('mongoose');
const Pet = require('./models/pet'); // Make sure this path is correct

mongoose.connect('mongodb://127.0.0.1:27017/littlepaws', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('✅ Connected to MongoDB');

  const petUpdates = [
    // 🐶 DOGS
    { name: "Bruno", type: "dog", photoUrl: "/uploads/dog3.jpeg" },
    { name: "Buddy", type: "dog", photoUrl: "/uploads/dog2.jpeg" },
    { name: "Bella", type: "dog", photoUrl: "/uploads/dog1.jpeg" },

    // 🐱 CATS
    { name: "Joey", type: "cat", photoUrl: "/uploads/IMG_2841.jpeg" },
    { name: "Bella", type: "cat", photoUrl: "/uploads/IMG_3533.jpeg" },
    { name: "Simba", type: "cat", photoUrl: "/uploads/1752663279722-IMG_3566.jpeg" },
  ];

  for (const { name, type, photoUrl } of petUpdates) {
    const filter = { name, type }; // helps avoid confusion when names repeat
    const result = await Pet.updateOne(
      filter,
      { $set: { photoUrl } }
    );

    if (result.modifiedCount > 0) {
      console.log(`✅ Updated ${name} (${type}) with photo: ${photoUrl}`);
    } else {
      console.log(`⚠️ No update made for ${name} (${type}) — check if it exists`);
    }
  }

  process.exit();
})
.catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
});

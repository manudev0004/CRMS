const mongoose = require('mongoose');

// MongoDB connection string (replace <username>, <password>, and <dbname> with actual values)
const MONGO_URI = 'mongodb://localhost:27017/authentication';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;

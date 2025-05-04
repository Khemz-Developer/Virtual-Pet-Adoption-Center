const mongoose = require('mongoose');
require('dotenv').config();

// Get MongoDB connection details 
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;

const uri = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.i6x5avl.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Cluster0`;

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
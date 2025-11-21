/* 
  MongoDB Connection Setup

  This script connects the application to a MongoDB Atlas database using Mongoose.
  The connection string (MONGO_URI) is securely stored in environment variables 
  for better security and flexibility. 

  - mongoose.connect() attempts to establish the connection.
  - On success, it logs a confirmation message.
  - On failure, it logs an error with details.

  Make sure your .env file contains:
    MONGO_URI = your_mongodb_connection_string
*/



const mongoose = require('mongoose');

// ✅ Correct connection string (replace <password> with URL-encoded version)
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB Atlas!'))
  .catch((err) => console.error('MongoDB connection error:', err));

/*
  🚀 Main Server Entry Point (app.js)

  This file initializes the Express server, connects to the database,
  loads environment variables, registers middleware, and mounts 
  all API routes for authentication and to-do tasks.

  Key Features:
    • Loads environment variables using dotenv.
    • Establishes a MongoDB connection before handling requests.
    • Enables CORS to allow API calls from the frontend.
    • Parses incoming JSON request bodies.
    • Exposes authentication and task-related API endpoints.
    • Starts the server on the configured port.

  Route Structure:
    • GET   /                 → Test route
    • POST  /api/register     → User registration
    • POST  /api/login        → User login
    • CRUD  /api/todo/...     → All task management operations

  Order Matters:
    - dotenv loads first so the entire app can access environment keys.
    - Database connection initializes before processing any requests.
    - Middleware (CORS, JSON parser) is registered before routes.
    - Routes are mounted under "/api" and "/api/todo".

  Startup:
    - The server listens on the PORT from the .env file (or defaults to 3000)
    - Logs a startup message with the local server URL.

  This file acts as the central hub of the backend application.
*/



require('dotenv').config(); 
require('./connections/connection');  
const cors = require('cors'); 
const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const toDoRoutes = require('./routes/toDoRoutes');
app.use(cors());    
app.use(express.json());



app.use('/api', authRoutes);
app.use('/api/todo', toDoRoutes);

const PORT = process.env.PORT || 3000; // ✅ now dotenv is loaded
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
/*
  🛣️ Authentication Routes

  This Express router handles all user authentication-related endpoints.
  It connects incoming HTTP requests (such as register and login) to the 
  appropriate controller functions inside authController.js.

  Routes:
    • POST /register → Creates a new user account.
    • POST /login    → Authenticates a user and returns a JWT token.

  Purpose:
    - Organizes authentication endpoints separately from other routes.
    - Keeps the server file clean by delegating route logic to controllers.
    - Allows the app to easily expand with more auth features (logout, refresh token, etc).

  Example Usage:
    POST http://localhost:3000/api/register
    POST http://localhost:3000/api/login

  This router is imported in the main server file (app.js/server.js)
  and mounted under a base path like "/api".
*/




const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');

 
router.post('/register', AuthController.registerUser);
router.post('/login', AuthController.loginUser);
module.exports = router;

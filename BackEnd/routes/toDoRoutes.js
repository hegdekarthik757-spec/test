/*
  📝 To-Do Routes (Task Management API)

  This router defines all endpoints related to task creation, retrieval,
  editing, deletion, and status updates. Every route is protected using
  the `authenticateToken` middleware, ensuring that only logged-in users
  with a valid JWT token can access their tasks.

  Routes:
    • POST   /create                  → Create a new task for a user
    • GET    /get-all-task/:userId    → Retrieve all tasks created by a user
    • DELETE /delete-task/:id         → Delete a specific task by ID
    • PATCH  /edit-task/:id           → Update the title or description of a task
    • PATCH  /toggle-complete/:id     → Mark a task as completed or incomplete

  How It Works:
    - Requests first pass through `authenticateToken`, which validates
      the JWT token sent in the Authorization header.
    - If the token is valid, the corresponding controller function
      (inside toDoController.js) handles the request.
    - If the token is missing, invalid, or expired, the request is blocked.

  Purpose:
    - Provides secure CRUD operations for the To-Do application.
    - Ensures each user can only access and manage their own tasks.
    - Keeps routes clean by delegating logic to the controller layer.

  Mounted Example:
    These routes are usually included in server.js as:
      app.use('/api/todo', todoRoutes);
*/





const express = require('express');
const router = express.Router();
require('dotenv').config()
const TodoControllers = require('../controllers/toDoController');
const authenticateToken = require('../middleware/authJwt');

 
router.post('/create',authenticateToken,TodoControllers.createTodo);
router.get('/get-all-task/:userId',authenticateToken,TodoControllers.getAllTask)
router.delete('/delete-task/:id',authenticateToken,TodoControllers.deleteTodo)
router.patch('/edit-task/:id',authenticateToken,TodoControllers.editTodo)
router.patch('/toggle-complete/:id', authenticateToken, TodoControllers.toggleComplete);

module.exports = router;

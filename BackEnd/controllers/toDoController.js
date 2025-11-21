/* 
  todoController.js

  This controller handles all CRUD operations for the To-Do tasks.
  It interacts with the MongoDB collection through the Todo model.

  Functions:
    • createTodo()    → Creates a new task for a user.
    • getAllTask()    → Retrieves all tasks for a specific user.
    • deleteTodo()    → Deletes a task by its ID.
    • editTodo()      → Updates an existing task’s title or description.
    • toggleComplete()→ Toggles a task’s completion status (done / not done).

  Each function returns an appropriate HTTP status code and message,
  making it easy for the frontend to display feedback.
*/


const Todo = require('../Models/taskList')
// const mongoose = require("mongoose");
async function createTodo(req,res){
    try {
        const data = req.body;
        const tasks = new Todo(data) 
        const result = await tasks.save()
        console.log(result);
        res.status(201).send({message: "created New Task",tasks:result})
        
    } catch (err) {
        console.log(err);
        res.status(401).send({message: "not created New Task"})
    }
} 
async function getAllTask(req, res) {
  try {
    const { userId } = req.params;
    const result = await Todo.find({ createdBy: userId });

    // ✅ Send the actual tasks too
    res.status(200).send({
      message: "Fetched tasks successfully",
      tasks: result
    });
  } catch (err) {
    console.error(err);
    res.status(400).send({
      message: "Error fetching tasks",
      error: err.message
    });
  }
}
 
async function deleteTodo(req,res){
      try {
        const {id} = req.params;
        const result = await Todo.findByIdAndDelete(id);
        console.log(result);
        res.send({message:"sucessfully deleted"})
        
    } catch (err) {
        console.log();

        res.status(404).send({message:"Invalid id"});
    }
}
async function editTodo(req,res){
          try {
        const {id} = req.params;
        const data = req.body;

        const result = await Todo.findByIdAndUpdate(id,{$set:data},{returnOriginal:false});
        console.log(result);
        res.send({message:"succesfully edited"})
        res.send({message:"sucessfully deleted"})
        
    } catch (error) {
        console.log();

        res.status(400).send(err);
    }   
}

async function toggleComplete(req, res) {
  try {
    const { id } = req.params;
    const { isCompleted } = req.body;

    const updated = await Todo.findByIdAndUpdate(
      id,
      { isCompleted },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({
      message: `Task marked as ${isCompleted ? "completed" : "incomplete"}`,
      task: updated,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating task status", error });
  }
}




module.exports = {createTodo,getAllTask,deleteTodo,editTodo,toggleComplete};    
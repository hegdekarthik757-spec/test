/*
  📋 userTaskListSchema (To-Do Task Model)

  This Mongoose schema defines the structure of the "myTodo" collection,
  which stores individual to-do tasks for each registered user.

  Fields:
    • title (String, required)      → The title or name of the task.
    • description (String, optional)→ Additional details or notes about the task.
    • isCompleted (Boolean, required)→ Marks the task as done (true) or pending (false).
    • createdBy (ObjectId, ref: "User")→ Links the task to the user who created it.

  Relationships:
    - "createdBy" references the "User" model using its ObjectId, 
      enabling per-user task management and filtering.

  Example document:
    {
      title: "Buy groceries",
      description: "Milk, eggs, bread",
      isCompleted: false,
      createdBy: ObjectId("675a2b4f9a7...")
    }

  Collection name in MongoDB:
    - Stored as "mytodos" (Mongoose automatically pluralizes the model name)
*/





const mongoose = require('mongoose');
const {Schema} = mongoose;

const userTaskListSchema = new Schema({
    title:{type:String,required:true},
    description:String, 
    isCompleted:{type:Boolean,required:true},
    createdBy:{
        ref: "User",
        type:Schema.ObjectId
    }
});

const tasks = mongoose.model("myTodo",userTaskListSchema)
module.exports = tasks;
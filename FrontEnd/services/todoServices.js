/* 
  todoServices.js

  This module handles all API interactions related to the To-Do feature.
  It uses Axios to communicate with the backend.
  Each function sends requests with an authorization token (if available)
  and performs CRUD operations for tasks:
  
    • createTask()     → Creates a new to-do item
    • getAllTask()     → Retrieves all tasks for a specific user
    • deleteTask()     → Deletes a task by its ID
    • editTask()       → Updates a task’s title or description
    • toggleComplete() → Toggles a task’s completion status

  The authHeaders() helper attaches the user’s token (from localStorage)
  to each request to ensure the API knows which user is making the call.
*/

import axios from 'axios'
import { getUserDetails } from '../util/getUser';

const SERVER_URL = `http://localhost:3000/api/todo`
; //change to window...

const authHeaders = ()=>{
    let userToken = getUserDetails()?.token;
    return {headers:{'Authorization':userToken}}
}
const createTask = (data)=>{
    return axios.post(SERVER_URL+'/create',data,authHeaders())

}

const getAllTask = (userId) =>{
    return axios.get(SERVER_URL+'/get-all-task/'+userId,authHeaders())
}
const deleteTask = (id) =>{
    return axios.delete(SERVER_URL+'/delete-task/'+id,authHeaders())
}
const editTask = (id,data) =>{
    return axios.patch(SERVER_URL+'/edit-task/'+id,data,authHeaders())
}
const toggleComplete = (id, data) => {
  return axios.patch(SERVER_URL+'/toggle-complete/'+id, data, authHeaders());
};


const todoServices = {
    createTask,
    getAllTask,
    deleteTask,
    editTask,
    toggleComplete
}

export default todoServices
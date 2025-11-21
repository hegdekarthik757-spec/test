import React, { useState, useEffect } from "react";
import "../css/TodoEditor.css";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { message } from "antd";
import { getErrorMessage } from "../../util/getError";
import { getUserDetails } from "../../util/getUser";
import todoServices from "../../services/todoServices";
import { useNavigate } from "react-router-dom";
import BinIcon from "../assets/images/bin.png";
import EditIcon from "../assets/images/edit.png";

const TodoEditor = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [allTask, setAllTask] = useState([]);
  const [editTaskId, setEditTaskId] = useState(null);

  const navigate = useNavigate();
  const user = getUserDetails();

  /* Fetch all tasks for the logged-in user */
  const getAllTask = async () => {
    try {
      const response = await todoServices.getAllTask(user?.userId);
      console.log("Fetched tasks..");
      setAllTask(response.data.tasks || []);
    } catch (err) {
      console.error(err);
      message.error(getErrorMessage(err));
    }
  };

  /* Verify user & load tasks on mount */
  useEffect(() => {
    if (user && user?.userId) {
      getAllTask();
    } else {
      navigate("/login");
    }
  }, [navigate]);

  /* Create or update task */
  async function handleSubmit() {
    setLoading(true);

    try {
      const userId = getUserDetails()?.userId;
      const data = {
        title,
        description,
        isCompleted: false,
        createdBy: userId,
      };

      let response;

      if (editTaskId) {
        response = await todoServices.editTask(editTaskId, data);
        message.success("Task updated successfully");
        setEditTaskId(null);
      } else {
        response = await todoServices.createTask(data);
        message.success("Task successfully added");
      }

      await getAllTask();
      setTitle("");
      setDescription("");
    } catch (err) {
      console.log(err);
      message.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  /* Delete a task */
  async function handleDeleteTask(item) {
    console.log(item._id);
    try {
      const response = await todoServices.deleteTask(item._id);
      console.log("Deleted:", response.data);
      message.success(`${item.title} deleted successfully`);
      getAllTask();
    } catch (err) {
      console.error("Delete error:", err);
      message.error(getErrorMessage(err));
    }
  }

  /* Enable edit mode */
  function handleEditTask(item) {
    try {
      setTitle(item.title);
      setDescription(item.description);
      setEditTaskId(item._id);
      message.info(`Editing task: ${item.title}`);
    } catch (err) {
      console.error(err);
      message.error(getErrorMessage(err));
    }
  }

  /* Toggle task completion */
  async function completedTask(index, item) {
    try {
      const updatedTasks = [...allTask];
      updatedTasks[index].isCompleted = !updatedTasks[index].isCompleted;
      setAllTask(updatedTasks);

      await todoServices.toggleComplete(item._id, {
        isCompleted: updatedTasks[index].isCompleted,
      });

      message.success(
        `Marked as ${
          updatedTasks[index].isCompleted ? "Completed" : "Incomplete"
        }`
      );
    } catch (err) {
      console.error(err);
      message.error(getErrorMessage(err));
    }
  }

  return (
    <div>
      <header>
        <Header />
        <Navbar />
      </header>

      <div className="app-wrapper">
        <div className="todo-container">
          <h1 className="title">My Tasks</h1>

          {/* Task Form */}
          <form className="task-form">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task Title"
              className="taskInput"
            />

            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description (optional)"
              className="taskInput"
            />

            <button
              onClick={handleSubmit}
              type="button"
              className="addTaskBtn"
            >
              <span>{loading ? "Adding..." : "Add Task"}</span>
            </button>
          </form>

          {/* Task List */}
          <div className="task-list-box">
            {allTask.length > 0 ? (
              allTask.map((item, index) => (
                <div className="TitleAndDescription" key={index}>
                  <input
                    type="checkbox"
                    className="checkBox"
                    checked={item.isCompleted}
                    onChange={() => completedTask(index, item)}
                  />

                  <div className={`textBox ${item.isCompleted ? "checked" : ""}`}>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>

                  <div className="toDoEditButtons">
                    <button
                      onClick={() => handleDeleteTask(item)}
                      className="deleteTaskDesc"
                    >
                      <img src={BinIcon} alt="delete" />
                    </button>

                    <button
                      onClick={() => handleEditTask(item)}
                      className="editTaskDesc"
                    >
                      <img src={EditIcon} alt="edit" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No tasks yet. Add one above 👆</p>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TodoEditor;

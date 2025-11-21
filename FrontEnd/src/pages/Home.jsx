import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "../css/Home.css";
import { useNavigate } from 'react-router-dom';
import {message} from 'antd'



/*isUserLoggedIn checks user info from local storage — returns true if data exists (user is logged in), otherwise false. */
const ToDoListLanding = () => {
  const navigate = useNavigate();
  function isUserLoggedIn(){
    const user = localStorage.getItem("todoAppUser");
    return !!user; 
  }
  /*If the user is logged in, redirect to the To-Do editor; otherwise, redirect to the login page. */
  function handleTodoClick(){
    if (isUserLoggedIn()) {
      navigate('/TodoEditor')
    }else{
      navigate('/Login')
      message.error("please log in")
    }
  }
  return (
    <div>
      <header>
        <Header/>
        <Navbar/>
      </header>

      <div className="containerHome">
        <section className="aboutTodoList">
          <h2>About ToDoList</h2>
          <p>
            ToDoList is a simple and efficient productivity tool designed to help you
            manage your daily tasks with ease. Whether you're a student, professional,
            or entrepreneur, our platform helps you stay on track and accomplish more.
          </p>
          <button className="btnTryTodoList" onClick={handleTodoClick}>
            Try To-Do List
          </button>
        </section>

        <section className="featuresTodoList">
          <div className="featureTodoList">
            <h3>✔ Easy to Use</h3>
            <p>
              Simple interface to add, edit, and organize your tasks effortlessly.
            </p>
          </div>
          <div className="featureTodoList">
            <h3>🤝 User Friendly</h3>
            <p>
              Easy to use and understandable — making your workflow elegant and smooth.
            </p>
          </div>
          <div className="featureTodoList">
            <h3>💡 Stay Productive</h3>
            <p>
              Focus on what matters and achieve your goals faster with ToDoList.
            </p>
          </div>
        </section>
      </div>

      <Footer/>
    </div>
  );
};

export default ToDoListLanding;

import React from 'react'
import "../css/About.css";
import FounderImg from "../assets/images/IMG_0477.PNG";
const About = () => {
  return (
    <div className="containerAboutUs">
        <section className="about">
          <h2>Who We Are</h2>
          <p>
            At <strong>ToDoList</strong>, we believe that productivity doesn’t have to
            be complicated. Our mission is to help individuals and teams stay organized,
            reduce stress, and get more done — all through a simple, elegant, and powerful
            to-do platform.
          </p>
        </section>

        <section className="missionTodoList">
          <h2>Our Mission</h2>
          <p>
            To empower people to manage their time effectively and achieve their goals.
            Whether you’re planning your day, tracking long-term projects, or managing a
            team, ToDoList adapts to your workflow.
          </p>
        </section>

        <section className="teamTodoList">
          <h2>Meet the Founder</h2>
          <div className="team-gridTodoList">
            <div className="memberTodoList">
                <img src={FounderImg} alt="Team Member" />
                <h3>Kartikeya Hegde</h3>
                <p>Founder & Developer</p>
          </div>
          </div>
          <div className="contactTodoList">
          <a href="mailto:hegdekarthik757@gmail.com" className="btnEmail">
            Contact Us
          </a>
        </div>
      </section>
    </div>
  )
}

export default About
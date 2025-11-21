import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import About from "../components/About";
import ContactUs from "../components/ContactUs";
import "../css/AboutUs.css";
// import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div >
      <header>
        <Header/>
        <Navbar/>
      </header>
      <About/>
      
      <Footer/>
    </div>
  );
};

export default AboutUs;

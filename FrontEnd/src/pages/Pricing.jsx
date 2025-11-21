import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../css/Pricing.css";
import PricingCards from "../components/PricingCards";

const Pricing = () => {
  return (
    <div>
      <header>
        <Header/>
        <Navbar/>
      </header>
      <PricingCards/>
     <Footer/>   
    </div>
  );
};

export default Pricing;

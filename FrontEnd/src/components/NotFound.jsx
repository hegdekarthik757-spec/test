import React from 'react'
import "../css/NotFound.css";
// import "../css/Home.css";
import Navbar from './Navbar';
import Header from './Header';
import Footer from './Footer';

const NotFound = () => {
  return (
    <div>
        <header>
        <Header/>
        <Navbar/>
      </header>
        <h2 className='NotFound'>404 | Page Not Found!..</h2>
        <Footer/>
    </div>
  )
}

export default NotFound
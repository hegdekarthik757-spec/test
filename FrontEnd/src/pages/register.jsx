import React, { useState } from "react";
import "../css/register.css";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import {Input,Button, message} from 'antd'
import authServices from "../../services/authServices";
import { getErrorMessage } from "../../util/getError";


const Register = () => {
    const[firstname,setFirstname] = useState("")
    const[lastname,setLastname] = useState("")
    const [username, setUsername] = useState("");
    const[password,setPassword] = useState("");
    const[loading,setLoading] = useState(false);
    const navigate = useNavigate()
    function userFirstNameInput(e){
        setFirstname(e.target.value)
    }
    function userLastNameInput(e){
        setLastname(e.target.value)
    }
    function userNameInput(e){
        setUsername(e.target.value)
    }
    function userPasswordInput(e){
        setPassword(e.target.value)
    }
    /*On form submission, set loading to true. While waiting for the response from AuthServices, verify user credentials. If successful, registre user in database, show a success message, and navigate to the Login. */
    async function handleSubmit(){
        try {
          setLoading(true);
            const data = {
                firstname, 
                lastname,
                username,
                password
            }
            if(data.username&&data.firstname&&data.lastname&&data.password){
                 const response = await authServices.registerUser(data)
                 console.log(response.data);
                 setLoading(false)
                 message.success("user registered")
                 navigate('/Login')
            }else{
              message.error(getErrorMessage("Please Fill Details"));
              setLoading(false)
            }
           

            
        } catch (err) {
            console.log();
            message.error(getErrorMessage(err));
            setLoading(false)
        }
    }
  return (
    <div className="login-page">
      <header className="header">
        <Header/>
        <Navbar/>
      </header>

      <div className="login-container">
        <form className="login-form">
          <h2>Register</h2>
            
          <label htmlFor="firstname">First Name</label>
          <Input type="text" id="firstname" placeholder="Enter firstname" 
          value={firstname}
          onChange={userFirstNameInput}/>
          
          <label htmlFor="lastname">Last Name</label>
          <Input type="text" id="firstname" placeholder="Enter lastname" 
          value={lastname}
          onChange={userLastNameInput}/>

          <label htmlFor="username">Username</label>
          <Input type="text" id="username" placeholder="Enter username" 
          value={username}
          onChange={userNameInput}/>

          <label htmlFor="password">Password</label>
          <Input.Password type="password" id="password" placeholder="Enter password"
          value={password}
          onChange={userPasswordInput}
          />

          <Button size="large" type="button" className="btn" onClick={handleSubmit} loading={loading}>
            Register
          </Button>

          <p className="sign-in-text">
            Already have an account?{" "}
            <Link to="/login" className="sign-in-link">
              Sign In
            </Link>
          </p>
        </form>
      </div>

      <Footer/>
    </div>
  );
};

export default Register;

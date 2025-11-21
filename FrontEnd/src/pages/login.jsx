import React, { useState } from "react";
import "../css/login.css";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { Input, Button, message } from "antd";
import authServices from "../../services/authServices";
import { getErrorMessage } from "../../util/getError";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  /* On form submission, set loading to true. While waiting for the response from AuthServices, verify user credentials. If successful, store user info in local storage, show a success message, and navigate to the To-Do editor.
  */
  async function handleSubmit() {
    try {
      const data = { username, password };
      if (data.username&&data.password) {
        setLoading(true);
        const response = await authServices.loginUser(data);
        localStorage.setItem("todoAppUser", JSON.stringify(response.data));
        message.success("Login successful!");
        navigate("/TodoEditor");
      }else{
        message.error("Please Fill Details")
      }
      
    } catch (err) {
      console.error(err);
      message.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <header className="header">
        <Header />
        <Navbar />
      </header>

      <div className="login-container">
        <form className="login-form" onSubmit={(e) => e.preventDefault()}>
          <h2>Login</h2>

          <label htmlFor="username">Username</label>
          <Input
            id="username"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <Input.Password
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            size="large"
            loading={loading}
            type="primary"
            className="btn"
            onClick={handleSubmit}
          >
            Login
          </Button>

          <p className="register-text">
            Don’t have an account?{" "}
            <Link to="/register" className="register-link">
              Register
            </Link>
          </p>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default Login;

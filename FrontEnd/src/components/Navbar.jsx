import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Navbar.css";
import { message } from "antd";
import { getUserDetails } from "../../util/getUser";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

    useEffect(() => {
      const userInfo = getUserDetails();
      setUser(userInfo);
    }, []);

  function handleLogout() {
    localStorage.removeItem("todoAppUser");
    message.info("Logut successfull")
    setUser(null);
    navigate("/login");
  }

  return (
    <div className="navigation">
      <Link to="/">Home</Link>
      <Link to="/Pricing">Pricing</Link>
      <Link to="/AboutUs">AboutUs</Link>

      {user ? (
        <>
          <span className="navbar-username">{user.username}</span>
          <button className="navbar-logout" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <>  
          <Link to="/login">LogIn / Register</Link>
        </>
      )}
    </div>
  );
};

export default Navbar;

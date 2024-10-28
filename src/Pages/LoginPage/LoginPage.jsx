import React from "react";
import Header from "../../Components/Header/Header";
import "./LoginPage.css";
import { FaUser, FaLock } from "react-icons/fa";


const LoginPage = () => {
  // UserLogin Function to be called when USer enters login credentials
  function UserLogin(event) {
    event.preventDefault(); // Prevents default form submission behavior
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    alert(username); // This will alert the username value
    alert(password); // This will alert the password value
    
  }

  return (
    <>
      <Header />
      <div className="wrapper">
        <form onSubmit={UserLogin}>
          <h1>Login</h1>
          <div className="input-box">
            <input
              type="text"
              id="username"
              placeholder="Username"
              required
            />
            <FaUser className="icon" />
          </div>
          <div className="input-box">
            <input
              type="password"
              id="password"
              placeholder="Password"
              required
            />
            <FaLock className="icon" />
          </div>
          <div className="remember-forgot">
            <label>
              <input type="checkbox" />
              Remember Me
            </label>
            <a href="/login">Forget Password?</a>
          </div>
          <button type="submit">Login</button>
          <div className="register-link">
            <p>
              Don't have an account? <a href="/register">Register</a>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginPage;

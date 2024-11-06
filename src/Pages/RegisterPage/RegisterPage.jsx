import React from "react";
import Header from "../../Components/Header/Header";
import "./RegisterPage.css";

const RegisterPage = () => {
  // UserRegister Function to be called when User registers a new account

  return (
    <>
      <Header />
      <div className="wrapper">
        <form>
          <h1>Register</h1>
          <button type="submit"><a href="/register">Register using Singpass</a></button>
        </form>
      </div>
    </>
  );
};

export default RegisterPage;

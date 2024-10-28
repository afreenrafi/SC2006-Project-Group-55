import React from "react";
import Header from "../../Components/Header/Header";
import "./HomePage.css";

const HomePage = () => {
  return (
    <>
      <Header />
      <div className="wrapper">
        <form>
          <h1>HomePage</h1>
          <hr></hr>
          <div class="mb-3 gap-3 d-flex flex-column">
            <a class="btn btn-outline-secondary" type="submit" href="/organiseEvent">
              Organise Event
            </a>
            <a class="btn btn-outline-secondary" type="submit" href="/organiserVerification">
              Organiser Verification
            </a>
          </div>
        </form>
      </div>
    </>
  );
};

export default HomePage;

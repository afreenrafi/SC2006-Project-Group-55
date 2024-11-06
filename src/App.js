import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Importing all Pages
import LoginPage from "./Pages/LoginPage/LoginPage";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import HomePage from "./Pages/HomePage/HomePage";
import OrganiseEventPage from "./Pages/OrganiseEventPage/OrganiseEventPage";
import OrganiserVerificationPage from "./Pages/OrganiserVerificationPage/OrganiserVerificationPage";
import ErrorPage from "./Pages/ErrorPage/ErrorPage";

function App() {
  return (
    <div className="App">
      {/* Start of Codes */}

      <div>
        <BrowserRouter>
          <Routes>
            {/* /* By default, website loads to LoginPage */}
            <Route index element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/organiseEvent" element={<OrganiseEventPage />} />
            <Route path="/organiserVerification" element={<OrganiserVerificationPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </div>

      {/* End of Codes */}

      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;

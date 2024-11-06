// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import EventDetails from './components/EventDetails';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          {/* Default route for homepage */}
          <Route path="/" element={<HomePage />} />
          {/* Route to display event details */}
          <Route path="/events/:id" element={<EventDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

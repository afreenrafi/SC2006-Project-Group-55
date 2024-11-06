import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState('All'); // Default filter
  const [loading, setLoading] = useState(true);

  // Function to fetch events based on the filter
  const fetchEvents = async (selectedFilter) => {
    setLoading(true); // Start loading
    try {
      let url = 'http://localhost:5000/api/events';
      if (selectedFilter !== 'All') {
        url += `?type=${selectedFilter}`; // Adjust the URL to include the filter
      }
      const response = await axios.get(url);
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Fetch events when the component mounts and when the filter changes
  useEffect(() => {
    fetchEvents(filter);
  }, [filter]); // Add 'filter' as a dependency so it triggers the useEffect when it changes

  // Function to handle filter change
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  // Function to handle the Enter button click
  const handleEnterClick = () => {
    fetchEvents(filter); // Fetch events with the selected filter
  };

  if (loading) {
    return <p>Loading events...</p>;
  }

  return (
    <div>
      <h1>Welcome to Cultivate</h1>
      <h1>Upcoming Art & Cultural Events</h1>
      
      {/* Filter Dropdown */}
      <div>
        <label>Filter by Event Type: </label>
        <select onChange={handleFilterChange} value={filter}>
          <option value="All">All</option>
          <option value="Museums">Museums</option>
          <option value="Exhibitions">Exhibitions</option>
          <option value="Performances">Performances</option>
          <option value="Festivals">Festivals</option>
        </select>
        
        {/* Enter Button */}
        <button onClick={handleEnterClick}>Enter</button>
      </div>

      {events.length > 0 ? (
        <ul>
          {events.map(event => (
            <li key={event._id}>
              <h2>{event.name}</h2>
              <p>Date: {event.date}</p>
              <p>Time: {event.time}</p>
              <p>Location: {event.location}</p>
              <p>Price: ${event.price}</p>
              <p>Available Tickets: {event.availableTickets}</p>
              <p>Type: {event.type}</p>
              <Link to={`/events/${event._id}`}>
                <button>Book Tickets</button>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No events found</p>
      )}
    </div>
  );
};

export default HomePage;

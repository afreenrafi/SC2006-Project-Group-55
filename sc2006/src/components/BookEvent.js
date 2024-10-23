import axios from 'axios';
import React, { useState } from 'react';

const BookEvent = ({ event }) => {
  const [userName, setUserName] = useState('');  // For storing user's name
  const [userEmail, setUserEmail] = useState(''); // For storing user's email
  const [quantity, setQuantity] = useState(1);    // For storing the number of tickets
  const [loading, setLoading] = useState(false);   // For managing loading state
  const [message, setMessage] = useState('');      // To display success/error messages

  // Function to handle the ticket booking
  const handleBooking = async () => {
    setLoading(true);
    setMessage(''); // Clear any previous messages

    try {
      const response = await axios.post('/api/book', {
        userName,      // Send user's name
        userEmail,     // Send user's email
        eventId: event._id, // Send event ID
        quantity,      // Send quantity of tickets
      });

      // Check response status or message if needed
      if (response.status === 200) {
        setMessage('Booking confirmed! Check your email.');
      } else {
        setMessage('Error booking tickets. Please try again.');
      }
    } catch (error) {
      setMessage('Error booking tickets. Please try again.');
    } finally {
      setLoading(false); // Stop loading regardless of success or error
    }
  };

  return (
    <div>
      <h2>Book Tickets for {event.name}</h2>
      <p>Location: {event.location}</p>
      <p>Date: {event.date}</p>
      <p>Available Tickets: {event.availableTickets}</p>

      <div>
        <label>Your Name:</label>
        <input
          type="text"
          placeholder="Enter your name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Your Email:</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Number of Tickets:</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))} // Ensure quantity is a number
          min="1"
          max={event.availableTickets}
          required
        />
      </div>

      <button onClick={handleBooking} disabled={loading}> {/* Disable button while loading */}
        {loading ? 'Booking...' : 'Book Tickets'}
      </button>

      {message && <p>{message}</p>} {/* Show success or error messages */}
    </div>
  );
};

export default BookEvent;

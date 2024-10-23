// ChargeableBookEvent.js
import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const ChargeableBookEvent = ({ event }) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [saveCard, setSaveCard] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const handleBooking = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      // Get card details
      const cardElement = elements.getElement(CardElement);
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) {
        setMessage(error.message);
        setLoading(false);
        return;
      }

      const response = await axios.post('/api/book/chargeable', {
        userName,
        userEmail,
        eventId: event._id,
        quantity,
        paymentMethodId: paymentMethod.id,
        saveCard,
      });

      setMessage('Booking confirmed! Check your email.');
    } catch (error) {
      setMessage('Error booking tickets. Please try again.');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleBooking}>
      <h2>Book Tickets for {event.name}</h2>
      <p>Price: ${event.price}</p>
      <p>Location: {event.location}</p>
      <p>Date: {event.date}</p>

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
          onChange={(e) => setQuantity(e.target.value)}
          min="1"
          max={event.availableTickets}
          required
        />
      </div>

      <div>
        <label>Card Details:</label>
        <CardElement />
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            checked={saveCard}
            onChange={(e) => setSaveCard(e.target.checked)}
          />
          Save card for future purchases
        </label>
      </div>

      <button type="submit" disabled={!stripe || loading}>
        {loading ? 'Processing...' : 'Book Tickets'}
      </button>

      {message && <p>{message}</p>}
    </form>
  );
};

export default ChargeableBookEvent;
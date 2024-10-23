import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import axios from 'axios';
import EventMap from '../EventMap'; // Import EventMap component
import BookEvent from './BookEvent'; // Import the booking component

const EventDetails = () => {
  const { id: eventId } = useParams(); // Use useParams to get eventId
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`/api/events/${eventId}`);
        setEvent(response.data);
      } catch (error) {
        console.error("Error fetching event details", error);
      }
    };

    fetchEvent();
  }, [eventId]);

  if (!event) return <div>Loading...</div>;

  return (
    <div>
      <h1>{event.name}</h1>
      <p>{event.description}</p>
      <p>Date: {event.date}</p>
      <p>Time: {event.time}</p>
      <p>Location: {event.location}</p>
      <p>Available Tickets: {event.availableTickets}</p>
      <p>Price: ${event.price}</p>

      {/* Render the map component */}
      <EventMap longitude={event.longitude} latitude={event.latitude} />

      {/* Embed the BookEvent component */}
      <BookEvent event={event} />
    </div>
  );
};

export default EventDetails;

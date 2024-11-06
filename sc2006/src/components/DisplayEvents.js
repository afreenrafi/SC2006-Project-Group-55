import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import './DisplayEvents.css'; // Optional CSS for styling

// Set up Mapbox access token (replace with your token)
mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';

const DisplayEvents = () => {
  const [events, setEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [map, setMap] = useState(null);

  useEffect(() => {
    // Fetch event data from the backend
    const fetchEvents = async () => {
        try {
            const response = await fetch('/api/events');
            if (response.ok) {  // Check if response is OK
              const data = await response.json();
              setEvents(data);
              setFilteredEvents(data);
            } else {
              console.log("Error: Failed to fetch events");
            }
          } catch (error) {
            console.log('Error fetching events:', error);
          }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    // Initialize Mapbox map
    const mapInstance = new mapboxgl.Map({
      container: 'map', // HTML element ID for the map
      style: 'mapbox://styles/mapbox/streets-v11', // Mapbox style
      center: [103.8198, 1.3521], // Singapore coordinates as center
      zoom: 10,
    });

    setMap(mapInstance);
  }, []);

  useEffect(() => {
    if (map && events.length > 0) {
      // Add markers to the map for each event location
      events.forEach((event) => {
        new mapboxgl.Marker()
          .setLngLat([103.8198, 1.3521]) // Replace with actual coordinates from event data
          .setPopup(new mapboxgl.Popup().setText(event.name)) // Popup shows event name
          .addTo(map);
      });
    }
  }, [map, events]);

  // Filter events by category
  const filteredEvents = events.filter((event) =>
    selectedCategory === 'All' ? true : event.category === selectedCategory
  );

  return (
    <div>
      <h2>Upcoming Art and Cultural Events</h2>

      <div className="filter-buttons">
        {/* Filter buttons */}
        <button onClick={() => setSelectedCategory('All')}>All</button>
        <button onClick={() => setSelectedCategory('Museums')}>Museums</button>
        <button onClick={() => setSelectedCategory('Exhibitions')}>Exhibitions</button>
        <button onClick={() => setSelectedCategory('Performances')}>Performances</button>
        <button onClick={() => setSelectedCategory('Festivals')}>Festivals</button>
      </div>

      {/* Mapbox map container */}
      <div id="map" style={{ width: '100%', height: '400px' }}></div>

      {/* Event list */}
      <div className="event-list">
        {filteredEvents.length === 0 ? (
          <p>No Events Found</p>
        ) : (
          filteredEvents.map((event) => (
            <div key={event._id} className="event-item">
              <h3>{event.name}</h3>
              <p>Date: {event.date}</p>
              <p>Time: {event.time}</p>
              <p>Location: {event.location}</p>
              <p>Price: ${event.price}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DisplayEvents;

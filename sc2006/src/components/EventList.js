import React, { useEffect, useState } from 'react';
import MapGL, { Marker } from 'react-map-gl';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [viewport, setViewport] = useState({
    latitude: 1.3521,   // Default to Singapore coordinates
    longitude: 103.8198,
    zoom: 12,
    width: '100vw',
    height: '50vh',
  });

  // Fetch events from backend on component load
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events');
        const data = await response.json();
        setEvents(data);
        setFilteredEvents(data); // Initially show all events
        console.log("Fetched Events:", data); // Debug: Log fetched events
      } catch (error) {
        console.log('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, []);

  // Handle filter selection
  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    if (filter === 'All') {
      setFilteredEvents(events); // Show all events
    } else {
      const filtered = events.filter(event => event.type === filter); // Filter by event type
      setFilteredEvents(filtered);
      console.log("Filtered Events:", filtered); // Debug: Log filtered events
    }
  };

  return (
    <div>
      <h2>Upcoming Events</h2>

      {/* Filter options */}
      <div>
        <button onClick={() => handleFilterChange('All')}>All</button>
        <button onClick={() => handleFilterChange('Museums')}>Museums</button>
        <button onClick={() => handleFilterChange('Exhibitions')}>Exhibitions</button>
        <button onClick={() => handleFilterChange('Performances')}>Performances</button>
        <button onClick={() => handleFilterChange('Festivals')}>Festivals</button>
      </div>

      {/* Event list */}
      <div>
        {filteredEvents.length === 0 ? (
          <p>No Events Found</p>
        ) : (
          filteredEvents.map((event) => (
            <div key={event._id} style={{ border: '1px solid black', margin: '20px', padding: '10px' }}>
              <h3>{event.name}</h3>
              <p>Date: {event.date}</p>
              <p>Time: {event.time}</p>
              <p>Location: {event.location}</p>
              <p>Price: ${event.price}</p>

              {/* Display Map with Event Location */}
              <MapGL
                {...viewport}
                onViewportChange={(nextViewport) => setViewport(nextViewport)}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN} // Mapbox token from environment variable
              >
                <Marker
                  latitude={event.latitude} // Assuming the event document has latitude and longitude fields
                  longitude={event.longitude}
                >
                  <div>📍</div>
                </Marker>
              </MapGL>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EventList;

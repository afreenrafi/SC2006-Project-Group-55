import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const EventMap = ({ longitude, latitude }) => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    if (longitude && latitude) {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [longitude, latitude],
        zoom: 12
      });

      // Add navigation controls to the map
      map.addControl(new mapboxgl.NavigationControl(), 'top-right');

      // Add marker for the event location
      new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map);

      return () => map.remove(); // Cleanup on unmount
    }
  }, [longitude, latitude]);

  return <div ref={mapContainerRef} style={{ width: '100%', height: '400px' }} />;
};

export default EventMap;

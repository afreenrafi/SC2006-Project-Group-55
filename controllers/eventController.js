// controllers/eventController.js
import Event from '../models/Event.js';

// Get all events or filter by type
export const getAllEvents = async (req, res) => {
  try {
    const filter = req.query.type ? { type: req.query.type } : {};
    const events = await Event.find(filter);
    if (events.length === 0) {
      return res.status(404).json({ message: "No Events Found" });
    }
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search for events by name
export const searchEvents = async (req, res) => {
  try {
    const searchQuery = req.query.q || '';
    const events = await Event.find({ name: new RegExp(searchQuery, 'i') });
    if (events.length === 0) {
      return res.status(404).json({ message: "No Events Found" });
    }
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get event details
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event Not Found" });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



import axios from 'axios';

// Geocode event location using MapBox API
const geocodeLocation = async (location) => {
  const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN;
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=${MAPBOX_TOKEN}&limit=1`;
  
  try {
    const response = await axios.get(url);
    const data = response.data;
    
    if (data.features && data.features.length > 0) {
      const coordinates = data.features[0].center; // [longitude, latitude]
      return {
        longitude: coordinates[0],
        latitude: coordinates[1]
      };
    } else {
      throw new Error("Location not found");
    }
  } catch (error) {
    console.error(error);
    throw new Error("Error in geocoding location");
  }
};

// Create a new event with geocoded location
export const createEvent = async (req, res) => {
  const { name, date, time, location, price, type } = req.body;

  try {
    const coordinates = await geocodeLocation(location);
    
    const newEvent = new Event({
      name,
      date,
      time,
      location,
      price,
      type,
      longitude: coordinates.longitude,
      latitude: coordinates.latitude
    });

    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

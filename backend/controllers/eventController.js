// BUSINESS LOGIC FOR EVENT ENTITY (CRUD)
// IMPORT NESCESSARY LIBRARIES
import Event from "../models/Event.js";
import { v4 as uuidv4 } from "uuid";

// READING ALL INSTANCES OF EVENT ENTITY
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find(); // Fetch all events from the database
    res.status(200).json(events); // Send back the events in the response
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READING SPECIFIC INSTANCE OF EVENT ENTITY BY EVENTID
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id); // Find event by ID
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATING NEW INSTANCE OF EVENT ENTITY
export const createEvent = async (req, res) => {
  const {
    eventName,
    eventDescription,
    eventStartDate,
    eventEndDate,
    eventOpen,
    eventClose,
    eventPrice,
  } = req.body;

  try {
    const newEvent = new Event({
      eventName,
      eventDescription,
      eventStartDate,
      eventEndDate,
      eventOpen,
      eventClose,
      eventPrice,
      eventId: uuidv4(), // Generate a unique ID for the event
    });
    const savedEvent = await newEvent.save(); // Save the new event in the database
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(400).json({ message: error.message }); // Handle validation errors
  }
};

// UPDATING SPECIFIC INSTANCE OF EXISTING EVENT ENTITY
export const updateEvent = async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedEvent)
      return res.status(404).json({ message: "Event not found" });
    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETEING SPECIFIC INSTANCE OF EXISTING EVENT ENTITY
export const deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent)
      return res.status(404).json({ message: "Event not found" });
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

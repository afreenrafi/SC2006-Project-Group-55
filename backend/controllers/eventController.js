// BUSINESS LOGIC FOR EVENT ENTITY (CRUD)
// IMPORT NESCESSARY LIBRARIES
import Event from "../models/Event.js";
import { v4 as uuidv4 } from "uuid";

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
    eventTicketQuantity,
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
      eventTicketQuantity,
      eventId: uuidv4(), // Generate a unique ID for the event
    });
    const savedEvent = await newEvent.save(); // Save the new event in the database
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(400).json({ message: error.message }); // Handle validation errors
  }
};

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
    const event = await Event.findOne({ eventId: req.params.id }); // Find event by ID
    if (!event) return res.status(404).json({ message: "Event not found!" });
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READING SPECIFIC INSTANCE OF EVENT ENTITY BY EVENTNAME (PARTIAL / FULL)
export const getEventByName = async (req, res) => {
  try {
    console.log("iun");
    const partialName = req.query.eventName || ""; // Get the partial name from query parameters
    const events = await Event.find({
      eventName: { $regex: partialName, $options: "i" },
    }); // Case-insensitive search
    if (events.length === 0)
      return res.status(404).json({ message: "No matching events found!" });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATING SPECIFIC INSTANCE OF EXISTING EVENT ENTITY
export const updateEvent = async (req, res) => {
  try {
    const updatedEvent = await Event.findOneAndUpdate(
      { eventId: req.params.id },
      req.body,
      { new: true }
    );
    if (!updatedEvent)
      return res.status(404).json({ message: "Event not found!" });
    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETING SPECIFIC INSTANCE OF EXISTING EVENT ENTITY
export const deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Event.findOneAndDelete({
      eventId: req.params.id,
    });
    if (!deletedEvent)
      return res.status(404).json({ message: "Event not found!" });
    res.status(200).json({ message: "Event deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

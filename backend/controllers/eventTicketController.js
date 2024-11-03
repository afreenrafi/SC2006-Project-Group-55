// BUSINESS LOGIC FOR EVENTTICKETSETTING ENTITY (CRUD)
// IMPORT NECESSARY LIBRARIES
import EventTicket from "../models/EventTicket.js";
import { Event } from "../models/Event.js";

// SUPPORTING FUNCTIONS RELATED TO EVENTTICKET ENTITY

// CREATING NEW EVENTTICKET OBJECT
export const createEventTicket = async (req, res) => {
  // SELECTIVELY EXTRACT FIELD INPUTS RELEVANT TO FUNCTION CREATEEVENTTICKET
  const { eventId } = req.params;
  const { eventTicketType, eventTicketQuantity } = req.body;

  try {
    // INSTANTIATING NEW EVENTTICKET OBJECT
    const newEventTicket = new EventTicket({
      eventTicketType: eventTicketType,
      eventTicketQuantity: eventTicketQuantity,
      eventId: eventId,
    });

    // SAVE NEW EVENTTICKET TO DATABASE
    await newEventTicket.save();

    res
      .status(201)
      .json({ message: "Successfully created new Event Ticket Type!" });
  } catch (error) {
    res.status(400).json({ message: "Internal Server Error Occurred!" });
  }
};

// RETRIEVING ALL EVENTTICKET OBJECTS FROM DATABASE
export const getAllEventTickets = async (req, res) => {
  try {
    const eventTickets = await EventTicket.find();
    res.status(200).json(eventTickets);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error Occurred!" });
  }
};

// RETRIEVING SPECIFIC EVENTTICKET OBJECT FROM DATABASE USING EVENTTICKETID
export const getEventTicketById = async (req, res) => {
  try {
    // SELECTIVELY EXTRACT FIELD INPUTS RELEVANT TO FUNCTION GETEVENTTICKETBYID
    const { eventTicketId } = req.params;

    // CHECKS IF EXISTING EVENTTICKETSS IN DATABASE HAVE THE SAME EVENTTICKETID
    const eventTicket = await Event.findOne({ eventTicketId: eventTicketId });
    if (!eventTicket) {
      return res.status(404).json({ message: "Event Ticket Type not found!" });
    }

    res.status(200).json(eventTicket);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error Occurred!" });
  }
};

// UPDATING EVENTTICKET OBJECT FROM DATABASE
export const updateEventTicket = async (req, res) => {
  try {
    // SELECTIVELY EXTRACT FIELD INPUTS RELEVANT TO FUNCTION UPDATEEVENTTICKET
    const { eventTicketId } = req.params;

    // RETRIEVE AND UPDATE CURRENT EVENTTICKET OBJECT FROM DATABASE
    const eventTicket = await EventTicket.findOneAndUpdate(
      { eventTicketId: eventTicketId },
      { ...req.body },
      { new: true, runValidators: true }
    );
    if (!eventTicket) {
      return res.status(404).json({ message: "Event Ticket Type not found!" });
    }

    res.status(200).json({
      message: "Event Ticket Type updated successfully!",
      eventTicket,
    });
  } catch (error) {
    res.status(400).json({ message: "Internal Server Error Occurred!" });
  }
};

// DELETING SPECIFIC EVENTTICKET OBJECT
export const deleteEventTicket = async (req, res) => {
  try {
    // SELECTIVELY EXTRACT FIELD INPUTS RELEVANT TO FUNCTION DELETEEVENTTICKETS
    const { eventTicketId } = req.params;

    // RETRIEVE AND DELETE CURRENT EVENTTICKET OBJECT FROM DATABASE
    const eventTicket = await EventTicket.findOneAndDelete({
      eventTicketId: eventTicketId,
    });
    if (!eventTicket)
      return res.status(404).json({ message: "Event Ticket Type not found!" });

    res
      .status(200)
      .json({ message: "Event Ticket Type deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error Occurred!" });
  }
};

// BUSINESS LOGIC FOR EVENTTICKETSETTING ENTITY (CRUD)
// IMPORT NECESSARY LIBRARIES
import EventTicket from "../models/EventTicket.js";
import Event from "../models/Event.js";

// SUPPORTING FUNCTIONS RELATED TO EVENTTICKET ENTITY

// CREATING NEW EVENTTICKET OBJECT
export const createEventTicket = async (req, res) => {
  // SELECTIVELY EXTRACT FIELD INPUTS RELEVANT TO FUNCTION CREATEEVENTTICKET
  const { eventTicketType, eventTicketPrice, eventTicketQuantity, eventId } =
    req.body;

  try {
    // CHECKS IF EXISTING EVENTS IN DATABASE HAVE THE SAME EVENTID
    const event = await Event.findOne({ eventId: eventId });
    if (!event) return res.status(404).json({ message: "Event not found!" });

    // CHECKS IF EXISTING EVENT OBJECT IS FREE OR CHARGEABLE, REJECTS CREATION OF EVENTTICKET OBJECT IF EVENT IS FREE BUT EVENTICKETPRICE IS NOT 0
    if (event.eventType === "Free" && eventTicketPrice != 0) {
      return res
        .status(404)
        .json({ message: "Event Ticket Price must be 0 as Event is Free!" });
    }

    if (event.eventType === "Chargeable" && eventTicketPrice === 0) {
      return res.status(404).json({
        message:
          "Event Ticket Price must be greater than 0 as Event is Chargeable!",
      });
    }

    // INSTANTIATING NEW EVENTTICKET OBJECT
    const newEventTicket = new EventTicket({
      eventTicketType: eventTicketType,
      eventTicketPrice: eventTicketPrice,
      eventTicketQuantity: eventTicketQuantity,
      eventId: eventId,
    });

    // SAVE NEW EVENTTICKET TO DATABASE
    await newEventTicket.save();

    // UPDATE EVENTTICKET ATTRIBUTE OF EVENT OBJECT
    event.eventTicket.push(newEventTicket.eventTicketId);

    // SAVE UPDATED EVENT OBJECT TO DATABASE
    await event.save();

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
export const getEventTicketsById = async (req, res) => {
  try {
    // SELECTIVELY EXTRACT FIELD INPUTS RELEVANT TO FUNCTION GETEVENTTICKETBYID
    const eventTicketIds = req.params.eventTicketIds.split(",");

    // CHECK IF eventTicketIds ARRAY IS VALID
    if (eventTicketIds.length === 0) {
      return res
        .status(400)
        .json({ message: "Types of Event Tickets will be updated soon!" });
    }

    // FIND ALL EVENT TICKETS THAT MATCH THE PROVIDED eventTicketIds
    const eventTickets = await EventTicket.find({
      eventTicketId: { $in: eventTicketIds },
    });

    // CHECK IF ANY EVENT TICKETS WERE FOUND
    if (eventTickets.length === 0) {
      return res
        .status(404)
        .json({ message: "No Event Tickets found for the provided IDs!" });
    }

    res.status(200).json(eventTickets);
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

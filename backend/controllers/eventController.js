// BUSINESS LOGIC FOR EVENT ENTITY (CRUD)
// IMPORT NESCESSARY LIBRARIES
import Event from "../models/Event.js";
import { User } from "../models/User.js";

// SUPPORTING FUNCTIONS RELATED TO EVENT ENTITY
const verifyEventArtist = async (req, res) => {
  // SELECTIVELY EXTRACT FIELD INPUTS RELEVANT TO FUNCTION VERIFYEVENTARTIST
  const { eventArtist, userId } = req.params;

  try {
    // LOOPING THROUGH EVERY ARTIST TAGGED IN EVENTARTIST
    for (const artistId of eventArtist) {
      const artist = await User.findOne({ userId: artistId });

      // VERIFIES ARTIST IF THEIR ARTISTVERIFIEDBY IS NULL
      if (artist && artist.artistVerifiedBy === null) {
        artist.artistVerifiedBy = userId;
        await artist.save();
      }
    }

    return { message: "Successfully verified all Artists!" };
  } catch (error) {
    res.status(400).json({ message: "Internal Server Error Occurred!" });
  }
};

// CREATING NEW EVENT OBJECT
export const createEvent = async (req, res) => {
  // SELECTIVELY EXTRACT FIELD INPUTS RELEVANT TO FUNCTION CREATEEVENT
  const {
    eventName,
    eventDescription,
    eventGenre,
    eventLocation,
    eventType,
    eventStartDate,
    eventEndDate,
    eventOpen,
    eventClose,
    eventPrice,
    eventTicketQuantity,
    eventArtist,
    userId,
  } = req.body;

  try {
    // INSTANTIATING NEW EVENT OBJECT
    const newEvent = new Event({
      eventName: eventName,
      eventDescription: eventDescription,
      eventGenre: eventGenre,
      eventLocation: eventLocation,
      eventType: eventType,
      eventStartDate: eventStartDate,
      eventEndDate: eventEndDate,
      eventOpen: eventOpen,
      eventClose: eventClose,
      eventPrice: eventPrice,
      eventTicketQuantity: eventTicketQuantity,
      eventArtist: eventArtist,
      userId: userId,
    });

    // SAVE NEW EVENT OBJECT TO DATABASE
    await newEvent.save();

    // VERIFIES ALL ARTISTS TAGGED IN THE EVENT OBJECT
    const verifyEventArtistResult = await verifyEventArtist({ params: { eventArtist, userId } }, res);

    res.status(201).json({ message: "Successfully created new Event!" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// RETRIEVING ALL EVENT OBJECTS FROM DATABASE
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error Occurred!" });
  }
};

// RETRIEVING SPECIFIC EVENT OBJECT FROM DATABASE USING EVENTID
export const getEventById = async (req, res) => {
  try {
    // SELECTIVELY EXTRACT FIELD INPUTS RELEVANT TO FUNCTION GETEVENTBYID
    const { eventId } = req.params;

    // CHECKS IF EXISTING EVENTS IN DATABASE HAVE THE SAME EVENTID
    const event = await Event.findOne({ eventId: eventId });
    if (!event) {
      return res.status(404).json({ message: "Event not found!" });
    }

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error Occurred!" });
  }
};

// RETRIEVING SPECIFIC EVENT OBJECTS FROM DATABASE USING EVENTNAME
export const searchEvents = async (req, res) => {
  try {
    // EXTRACT SEARCH QUERY PARAMETER OR DEFAULT TO EMPTY STRING IF NONE PROVIDED
    const searchQuery = req.query.q || "";

    // EXTRACT PAGINATION PARAMETERS OR SET DEFAULT VALUES (LIMIT = 10, PAGE = 1)
    const limit = parseInt(req.query.limit, 10) || 10;
    const page = parseInt(req.query.page, 10) || 1;

    // SEARCH DATABASE FOR EVENTS WHERE EVENTNAME MATCHES SEARCH QUERY (CASE-INSENSITIVE)
    const events = await Event.find({
      eventName: new RegExp(searchQuery, "i"),
    })
      .limit(limit) // LIMIT RESULTS TO SPECIFIED NUMBER PER PAGE
      .skip((page - 1) * limit); // SKIP RESULTS TO IMPLEMENT PAGINATION

    // IF NO MATCHING EVENTS ARE FOUND, RETURN A 404 STATUS
    if (events.length === 0) {
      return res.status(404).json({ message: "No Events Found!" });
    }

    // RETURN MATCHING EVENTS ALONG WITH PAGINATION INFO
    res.json({ events, page, limit });
  } catch (error) {
    // HANDLE ANY ERRORS DURING THE SEARCH PROCESS
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

// UPDATING EVENT OBJECT FROM DATABASE
export const updateEvent = async (req, res) => {
  try {
    // SELECTIVELY EXTRACT FIELD INPUTS RELEVANT TO FUNCTION UPDATEEVENT
    const { eventId } = req.params;

    // RETRIEVE CURRENT USER OBJECT FROM DATABASE
    const event = await Event.findOneAndUpdate(
      { eventId: eventId },
      { ...req.body },
      { new: true, runValidators: true }
    );
    if (!event) {
      return res.status(404).json({ message: "Event not found!" });
    }

    res.status(200).json({ message: "Event updated successfully!", event });
  } catch (error) {
    res.status(400).json({ message: "Internal Server Error Occurred!" });
  }
};

// DELETING SPECIFIC EVENT OBJECT
export const deleteEvent = async (req, res) => {
  try {
    // SELECTIVELY EXTRACT FIELD INPUTS RELEVANT TO FUNCTION DELETEEVENT
    const { eventId } = req.params;

    // RETRIEVE CURRENT EVENT OBJECT FROM DATABASE
    const event = await Event.findOneAndDelete({
      eventId: eventId,
    });
    if (!event) return res.status(404).json({ message: "Event not found!" });

    res.status(200).json({ message: "Event deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error Occurred!" });
  }
};

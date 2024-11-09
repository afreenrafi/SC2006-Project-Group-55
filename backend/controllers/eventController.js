// BUSINESS LOGIC FOR EVENT ENTITY (CRUD)
// IMPORT NECESSARY LIBRARIES
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

  // SELECTIVELY EXTRACT FIELD INPUTS RELEVANT TO FUNCTION GETEVENTBYID
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
      eventArtist: eventArtist,
      userId: userId,
    });

    // SAVE NEW EVENT OBJECT TO DATABASE
    await newEvent.save();

    // VERIFIES ALL ARTISTS TAGGED IN THE EVENT OBJECT
    const verifyEventArtistResult = await verifyEventArtist(
      { params: { eventArtist, userId } },
      res
    );

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

// RETRIEVING SPECIFIC EVENT OBJECTS FROM DATABASE USING EVENTNAME, EVENTGENRE, AND EVENTTYPE
export const searchEvents = async (req, res) => {
  try {
    // Extract search query parameters
    const { q: searchQuery = "", eventGenre, eventType } = req.query;

    // Build the query object
    const query = {};

    // Add genre filter if provided
    if (eventGenre) {
      query.eventGenre = new RegExp(eventGenre, "i"); // Case-insensitive match for genre
    }

    // Add type filter if provided
    if (eventType) {
      query.eventType = new RegExp(eventType, "i"); // Case-insensitive match for type
    }

    // Add name filter if provided
    if (searchQuery) {
      query.eventName = new RegExp(searchQuery, "i"); // Case-insensitive match for event name
    }

    // Extract pagination parameters or set default values (LIMIT = 10, PAGE = 1)
    const limit = parseInt(req.query.limit, 10) || 10;
    const page = parseInt(req.query.page, 10) || 1;

    // Search database for events matching the query
    const events = await Event.find(query)
      .limit(limit) // Limit results to specified number per page
      .skip((page - 1) * limit); // Skip results to implement pagination

    // If no matching events are found, return a 404 status
    if (events.length === 0) {
      return res.status(404).json({ message: "No Events Found!" });
    }

    // Return matching events along with pagination info
    res.json({ events, page, limit });
  } catch (error) {
    // Handle any errors during the search process
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

// UPDATING EVENT OBJECT FROM DATABASE
export const updateEvent = async (req, res) => {
  try {
    // SELECTIVELY EXTRACT FIELD INPUTS RELEVANT TO FUNCTION UPDATEEVENT
    const { eventId } = req.params;

    // RETRIEVE AND UPDATE CURRENT EVENT OBJECT FROM DATABASE
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

// BOOKMARKING/UNBOOKMARKING SPECIFIC EVENT OBJECT
export const bookmarkEvent = async (req, res) => {
  try {
    // SELECTIVELY EXTRACT FIELD INPUTS RELEVANT TO FUNCTION BOOKMARKEVENT
    const { userId, eventId } = req.params;

    // RETRIEVE CURRENT USER OBJECT FROM DATABASE
    const user = await User.findOne({ userId: userId });
    if (!user) return res.status(404).json({ message: "User not found!" });

    // UPDATE USER OBJECT USERBOOKMARK ATTRIBUTE
    // BOOKMARK IF EVENT HAS NOT BEEN BOOKMARK
    // UNBOOKMARK IF EVENT HAS BEEN BOOKMARK

    // CHECK IF EVENTID IS ALREADY IN userBookmark ARRAY
    const bookmarkIndex = user.userBookmark.indexOf(eventId);

    if (bookmarkIndex === -1) {
      // BOOKMARK EVENT IF NOT PRESENT IN ARRAY
      user.userBookmark.push(eventId);
    } else {
      // UNBOOKMARK EVENT IF ALREADY PRESENT IN ARRAY
      user.userBookmark.splice(bookmarkIndex, 1);
    }

    // SAVE UPDATED USER OBJECT
    await user.save();

    res
      .status(200)
      .json({
        message:
          bookmarkIndex === -1 ? "Event bookmarked!" : "Event unbookmarked!",
        userBookmark: user.userBookmark,
      });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error Occurred!" });
  }
};

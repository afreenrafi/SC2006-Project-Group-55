// BUSINESS LOGIC FOR BOOKING ENTITY (CRUD)
// IMPORT NESCESSARY LIBRARIES
import { User } from "../models/User.js";
import Booking from "../models/Booking.js";
import Event from "../models/Event.js";
import nodemailer from 'nodemailer';
import EventTicket from "../models/EventTicket.js";

// SUPPORTING FUNCTIONS RELATED TO BOOKING ENTITY
const sendConfirmationEmail = async (
  bookingName,
  bookingEmail,
  bookingQuantity,
  eventName
) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: bookingEmail,
    subject: "Event Booking Confirmation",
    text: `Hello ${bookingName},\n\nYou have successfully booked ${bookingQuantity} ${eventName} ticket(s) for the event.\n\nThank you for booking with us!`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error("Error sending email");
  }
};

// FUNCTION TO GET AVAILABLE TICKETS FOR AN EVENT TICKET
const getAvailableTickets = (eventTicket) => {
  return eventTicket.eventTicketQuantity - eventTicket.eventTicketQuantityBooked;
};

// VALIDATION FUNCTION FOR USER, EVENT, AND TICKET AVAILABILITY
export const validateBookingRequest = async (req, res) => {
  try {
    const { userId, eventId, bookingQuantity, eventTicketType, attendingDate } = req.body;

    // Validate input parameters
    if (!userId || !eventId || !bookingQuantity || !eventTicketType || !attendingDate) {
      return res.status(400).json({
        message: "Missing required fields: userId, eventId, bookingQuantity, eventTicketType, or attendingDate.",
      });
    }

    // Validate bookingQuantity is a positive integer
    if (typeof bookingQuantity !== 'number' || bookingQuantity <= 0) {
      return res.status(400).json({ message: "Invalid booking quantity. It must be a positive number." });
    }

    // Validate attendingDate format
    const attendingDateObj = new Date(attendingDate);
    if (isNaN(attendingDateObj.getTime())) {
      return res.status(400).json({ message: "Invalid attending date format. Please provide a valid date." });
    }

    // Check if the user exists
    const user = await User.findOne({ userId: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Check if the event ticket exists for the given eventId and eventTicketType
    const eventTicket = await EventTicket.findOne({
      eventId: eventId,
      eventTicketType: eventTicketType,
    });
    if (!eventTicket) {
      return res.status(404).json({ message: "Event ticket not found!" });
    }

    // Check if the event exists and fetch the event details
    const event = await Event.findOne({ eventId: eventId });
    if (!event) {
      return res.status(404).json({ message: "Event not found!" });
    }

    // Validate attendingDate is within the event's time frame
    if (
      attendingDateObj < new Date(event.eventStartDate) ||
      attendingDateObj > new Date(event.eventEndDate)
    ) {
      return res.status(400).json({
        message: "Attending date is not within the event's start and end date range.",
        data: {
          eventStartDate: event.eventStartDate,
          eventEndDate: event.eventEndDate,
        },
      });
    }

    // Get the available ticket quantity
    const availableTickets = getAvailableTickets(eventTicket);

    // Check if there are enough tickets available
    if (availableTickets < bookingQuantity) {
      return res.status(400).json({
        message: "Selected Event Ticket does not have enough tickets available!",
        data: { availableTickets },
      });
    }

    // Send a successful response with validated user, event ticket, and available ticket quantity
    return res.status(200).json({
      message: "Validation successful!",
      data: { user, eventTicket, availableTickets },
    });
  } catch (error) {
    // Handle unexpected errors
    return res.status(500).json({ message: "Internal server error.", error: error.message });
  }
};

// FUNCTION TO CREATE BOOKING AND SEND CONFIRMATION EMAIL
export const createBookingAndSendEmail = async (req, res) => {
  try {
    const { userId, eventId, bookingQuantity, eventTicketType, eventTicketPrice, attendingDate } = req.body;

    // Validate that all required fields are provided
    if (!userId || !eventId || !bookingQuantity || !eventTicketType || !eventTicketPrice || !attendingDate) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Validate data types
    if (typeof bookingQuantity !== 'number' || bookingQuantity <= 0) {
      return res.status(400).json({ message: "Invalid booking quantity. It must be a positive number." });
    }
    if (typeof eventTicketPrice !== 'number' || eventTicketPrice < 0) {
      return res.status(400).json({ message: "Invalid event ticket price. It must be a non-negative number." });
    }
    if (!Date.parse(attendingDate)) {
      return res.status(400).json({ message: "Invalid attending date. It must be a valid date string." });
    }

    // Find the user by userId
    const user = await User.findOne({ userId: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Find the event ticket by eventId and eventTicketType
    const eventTicket = await EventTicket.findOne({
      eventId: eventId,
      eventTicketType: eventTicketType,
    });
    if (!eventTicket) {
      return res.status(404).json({ message: "Event ticket not found." });
    }

    // Check if attendingDate is within the event's date range
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found." });
    }
    const eventStartDate = new Date(event.eventStartDate);
    const eventEndDate = new Date(event.eventEndDate);
    const userAttendingDate = new Date(attendingDate);

    if (userAttendingDate < eventStartDate || userAttendingDate > eventEndDate) {
      return res.status(400).json({
        message: "Attending date must be within the event's start and end dates.",
        data: { eventStartDate, eventEndDate },
      });
    }

    // Check if the quantity to be booked is available
    if (eventTicket.eventTicketQuantity - eventTicket.eventTicketQuantityBooked < bookingQuantity) {
      return res.status(400).json({ message: "Not enough tickets available." });
    }

    // Create a new booking document
    const newBooking = new Booking({
      bookingName: user.userName,
      bookingEmail: user.userEmail,
      bookingQuantity: bookingQuantity,
      eventId: eventId,
      eventTicketId: eventTicket.eventTicketId,
      userId: userId,
      eventTicketPrice: eventTicketPrice, // Include the ticket price
      eventTicketType: eventTicketType, // Include the ticket type
      attendingDate: new Date(attendingDate), // Include the attending date and ensure it's a Date object
    });

    // Save the new booking to the database
    await newBooking.save();

    // Update the event ticket's booked quantity
    eventTicket.eventTicketQuantityBooked += bookingQuantity;
    await eventTicket.save();

    // Update the user's TicketBooked array
    user.TicketBooked.push(newBooking.bookingId); // Add the bookingId to the array
    await user.save();

    // Send confirmation email
    await sendConfirmationEmail(
      newBooking.bookingName,
      newBooking.bookingEmail,
      bookingQuantity,
      eventTicketType, // Pass the ticket type to the email function
      eventTicket.eventId
    );

    // Respond with booking details
    return res.status(201).json({
      message: "Successfully booked tickets! A confirmation email has been sent to your email!",
      booking: newBooking,
    });
  } catch (error) {
    // Catch any unexpected errors and respond with a 500 Internal Server Error
    return res.status(500).json({ message: "An unexpected error occurred.", error: error.message });
  }
};


export const getTicketBooked = async (req, res) => {
  try {
    const { userId } = req.params;

    // Check if userId is provided
    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    // Validate the userId format (assuming it should be a string of a certain length or pattern)
    if (typeof userId !== 'string' || userId.trim().length === 0) {
      return res.status(400).json({ message: "Invalid User ID format." });
    }

    // Find the user by userId
    const user = await User.findOne({ userId: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check if the user's TicketBooked array is empty
    if (!user.TicketBooked || user.TicketBooked.length === 0) {
      return res.status(404).json({ message: "No bookings found for this user." });
    }

    // Retrieve all bookings associated with the user's TicketBooked array
    const bookings = await Booking.find({
      bookingId: { $in: user.TicketBooked },
    });

    // Check if no bookings were found (for edge cases where booking IDs are invalid)
    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ message: "No valid bookings found for this user." });
    }

    // Return the booking details
    return res.status(200).json({ bookings });
  } catch (error) {
    // Catch any unexpected errors and respond with a 500 Internal Server Error
    return res.status(500).json({ message: "Internal Server Error Occurred!", error: error.message });
  }
};

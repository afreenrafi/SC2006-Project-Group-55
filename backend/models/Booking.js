//models/Booking.js
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const BookingSchema = new mongoose.Schema({
  bookingId: {
    type: String,
    required: true,
    unique: true,
    default: uuidv4,
  },
  bookingName: {
    type: String,
    required: true,
  },
  bookingEmail: {
    type: String,
    required: true,
  },
  bookingQuantity: {
    type: Number,
    required: true,
  },
  bookingDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  attendingDate: {
    type: Date,
    required: true, // Ensure the attending date is required
  },
  eventId: {
    type: String,
    required: true,
    ref: "Event", // Reference to the Event model
  },
  eventTicketId: {
    type: String,
    required: true, // Ensure it's required
    ref: "EventTicket", // Reference to the EventTicket model
  },
  userId: {
    type: String,
    required: true,
    ref: "User", // Reference to the User model
  },
  eventTicketPrice: {
    type: Number,
    required: true, // Ensure the ticket price is required
    min: 0, // Ensure the price is a positive number
  },
  eventTicketType: {
    type: String,
    required: true,
    enum: ["Adult", "Child", "Senior Citizen", "VIP"],
  },
});


const Booking = mongoose.model("Booking", BookingSchema);
export default Booking;

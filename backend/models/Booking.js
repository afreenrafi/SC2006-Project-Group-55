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
  eventId: {
    type: String,
    required: true,
    ref: "Event",
  },
  userId: {
    type: String,
    required: true,
    ref: "User",
  },
});

const Booking = mongoose.model("Booking", BookingSchema);
export default Booking;
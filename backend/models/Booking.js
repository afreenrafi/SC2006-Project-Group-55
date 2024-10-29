//models/Booking.js
import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  bookingId: {
    type: String,
    required: true,
    unique: true,
  },
  bookingName: {
    type: String,
    required: true,
  }, // New field for user's name
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
    default: Date.now,
  },
  eventId: {
    type: String,
    ref: "Event",
    required: true,
  },
});

// MIDDLEWARE TO AUTO-GENERATE UNIQUE BOOKINGID BEFORE SAVING
BookingSchema.pre("save", function (next) {
  if (!this.bookingId) {
    this.bookingId = uuidv4();
  }
  next();
});

const Booking = mongoose.model("Booking", BookingSchema);
export default Booking;

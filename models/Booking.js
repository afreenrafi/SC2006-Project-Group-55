//models/Booking.js
import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  userName: { type: String, required: true },  // New field for user's name
  userEmail: { type: String, required: true },
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  quantity: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;

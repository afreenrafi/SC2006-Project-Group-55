import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
// Define the Event schema (adjust this to match your actual schema)
const eventSchema = new mongoose.Schema({
  eventId: {
    type: String,
    required: true,
    unique: true
  },
  eventName: {
    type: String,
    required: true
  },
  availableTickets: {
    type: Number,
    required: true
  },
  bookedTickets: {
    type: Number,
    default: 0
  }
});

// Create the Event model
const Event = mongoose.model('Event', eventSchema);
const MONGOURL = process.env.MONGO_URL || process.env.MONGO_URI;

// Connect to MongoDB (replace with your actual MongoDB URI)
mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log('Database connected successfully');
    return fetchAllEvents();  // Fetch all events after the connection is successful
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });

// Function to fetch and log all events
async function fetchAllEvents() {
  try {
    const allEvents = await Event.find({});
    console.log('All Events:', allEvents);
    process.exit(0); // Exit the process after logging
  } catch (error) {
    console.error('Error retrieving events:', error);
    process.exit(1); // Exit the process with an error code
  }
}

//server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';

// Import routes
import auth from './middleware/auth.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import eventRoutes from './routes/eventRoutes.js'; // Event routes from second code
import Event from './models/Event.js';  // Import Event model from second code

// Initialize environment variables
dotenv.config();

// File path configurations
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

/* MIDDLEWARE */
app.use(express.json()); // Parse incoming JSON requests
app.use(helmet()); // Secure your Express apps by setting various HTTP headers
app.use(morgan('common')); // Logger middleware for HTTP requests
app.use(bodyParser.json({ limit: '10mb', extended: true })); // Parsing JSON with size limit
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true })); // Parsing URL-encoded bodies with size limit
app.use(cors()); // Enable CORS

/* ROUTES */
app.use('/api/authRoutes', authRoutes); // Authentication routes
app.use('/api/userRoutes', userRoutes); // User management routes
app.use('/api/events', eventRoutes); // Event management routes from the second code

// API route to fetch all events (this is optional if handled in eventRoutes)
app.get('/api/events', async (req, res) => {
  const type = req.query.type; // Get the event type from query parameters
  try {
    const query = type && type !== 'All' ? { type } : {};
    const events = await Event.find(query);
    res.json(events);
  } catch (error) {
    console.error('Error retrieving events:', error);
    res.status(500).json({ message: 'Error retrieving events' });
  }
});

// POST route to create a new event (this is optional if handled in eventRoutes)
app.post('/api/events', async (req, res) => {
  const { name, date, time, location, price } = req.body;

  try {
    const newEvent = new Event({
      name,
      date,
      time,
      location,
      price,
    });

    await newEvent.save();
    res.status(201).json({ message: 'Event successfully created' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating event', error });
  }
});

/* DATABASE CONNECTION */
const MONGOURL = process.env.MONGO_URL || process.env.MONGO_URI; // Use either MONGO_URL or MONGO_URI based on environment variables
mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log('Database connected successfully.');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch(error => console.log('MongoDB connection error:', error));

// Wildcard route to serve React app (optional)
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'server.html')); // Adjust the path as necessary
});

// Wildcard route (for React app or to handle 404s)
app.get('*', (req, res) => {
  res.status(404).send('Not Found');
});

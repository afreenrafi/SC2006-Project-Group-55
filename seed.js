import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Event from './models/Event.js'; // Ensure this path is correct

dotenv.config();
const ObjectId = mongoose.Types.ObjectId;

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database connected successfully.");
    
    // Sample event data
    const sampleEvents = [
      {
        eventId: new ObjectId(),
    eventName: 'Cultural Festival',
    eventDescription: 'A vibrant festival celebrating diverse cultures with music, dance, and art.',
    eventStartDate: new Date('2024-11-05T10:00:00'),
    eventEndDate: new Date('2024-11-05T18:00:00'),
    eventOpen: new Date('2024-10-01T09:00:00'),
    eventClose: new Date('2024-10-31T17:00:00'),
    price: 20,
    eventTicketQuantity: 500,
    name: 'Cultural Festival',
    date: new Date('2024-11-05'),
    time: '10:00 AM',
    location: 'Main Hall, NTU Campus',
    type: 'Festival',
    latitude: 1.3483,
    longitude: 103.6831,
    availableTickets: 500,
    bookedTickets: 0,
  },
  {
    eventId: new ObjectId(),
    eventName: 'Tech Innovation Summit',
    eventDescription: 'A conference where industry leaders discuss the latest innovations in technology.',
    eventStartDate: new Date('2024-12-10T09:00:00'),
    eventEndDate: new Date('2024-12-10T17:00:00'),
    eventOpen: new Date('2024-11-01T08:00:00'),
    eventClose: new Date('2024-12-01T17:00:00'),
    price: 100,
    eventTicketQuantity: 300,
    name: 'Tech Innovation Summit',
    date: new Date('2024-12-10'),
    time: '09:00 AM',
    location: 'Conference Center, NTU',
    type: 'Conference',
    latitude: 1.3521,
    longitude: 103.8198,
    availableTickets: 300,
    bookedTickets: 0,
  },
  {
    eventId: new ObjectId(),
    eventName: 'Art Expo 2024',
    eventDescription: 'A showcase of modern art from various local and international artists.',
    eventStartDate: new Date('2024-11-15T10:00:00'),
    eventEndDate: new Date('2024-11-15T19:00:00'),
    eventOpen: new Date('2024-10-10T09:00:00'),
    eventClose: new Date('2024-11-10T17:00:00'),
    price: 15,
    eventTicketQuantity: 200,
    name: 'Art Expo 2024',
    date: new Date('2024-11-15'),
    time: '10:00 AM',
    location: 'Art Center, NTU',
    type: 'Exhibition',
    latitude: 1.2956,
    longitude: 103.7764,
    availableTickets: 200,
    bookedTickets: 0,
  },
  {
    eventId: new ObjectId(),
    eventName: 'Music Marathon 2024',
    eventDescription: 'A day-long music festival featuring top local and international bands.',
    eventStartDate: new Date('2024-12-01T12:00:00'),
    eventEndDate: new Date('2024-12-01T23:59:00'),
    eventOpen: new Date('2024-11-15T10:00:00'),
    eventClose: new Date('2024-11-30T18:00:00'),
    price: 50,
    eventTicketQuantity: 800,
    name: 'Music Marathon 2024',
    date: new Date('2024-12-01'),
    time: '12:00 PM',
    location: 'Open Field, NTU Campus',
    type: 'Concert',
    latitude: 1.3435,
    longitude: 103.6800,
    availableTickets: 800,
    bookedTickets: 0,
  },
  {
    eventId: new ObjectId(),
    eventName: 'Entrepreneurship Bootcamp',
    eventDescription: 'A weekend bootcamp for aspiring entrepreneurs to network and pitch their ideas.',
    eventStartDate: new Date('2024-11-20T09:00:00'),
    eventEndDate: new Date('2024-11-22T17:00:00'),
    eventOpen: new Date('2024-10-20T09:00:00'),
    eventClose: new Date('2024-11-19T17:00:00'),
    price: 200,
    eventTicketQuantity: 100,
    name: 'Entrepreneurship Bootcamp',
    date: new Date('2024-11-20'),
    time: '09:00 AM',
    location: 'Innovation Lab, NTU',
    type: 'Workshop',
    latitude: 1.3500,
    longitude: 103.6850,
    availableTickets: 100,
    bookedTickets: 0,
      },
    ];

    // Save sample events to the database
    Event.insertMany(sampleEvents)
      .then(() => {
        console.log("Sample events added successfully.");
        mongoose.connection.close(); // Close the connection
      })
      .catch((error) => {
        console.error("Error adding sample events:", error);
        mongoose.connection.close();
      });
  })
  .catch(error => {
    console.error("Database connection error:", error);
  });

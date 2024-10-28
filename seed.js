import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Event from './models/Event.js'; // Ensure this path is correct

dotenv.config();
const ObjectId = mongoose.Types.ObjectId;

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database connected successfully.");
    
    // Sample event data
    const sampleEvents =[
      {
        "eventId": new ObjectId(),
        "eventName": "Art Exhibition: Modern Masterpieces",
        "eventDescription": "Explore a curated collection of modern art pieces from renowned artists.",
        "eventLocation": "City Art Gallery",
        "eventType": "Art & Culture",
        "eventStartDate": new Date("2024-11-10T10:00:00Z"),
        "eventEndDate": new Date("2024-11-15T18:00:00Z"),
        "eventOpen": new Date("2024-11-01T09:00:00Z"),
        "eventClose": new Date("2024-11-10T09:00:00Z"),
        "price": 15,
        "availableTickets": 200,
        "bookedTickets": 50
      },
      {
        "eventId": new ObjectId(),
        "eventName": "Rock Concert: Soundwave 2024",
        "eventDescription": "Join us for an unforgettable night with top rock bands performing live.",
        "eventLocation": "Arena Stadium",
        "eventType": "Music",
        "eventStartDate": new Date("2024-12-05T19:00:00Z"),
        "eventEndDate": new Date("2024-12-05T23:00:00Z"),
        "eventOpen": new Date("2024-11-15T09:00:00Z"),
        "eventClose": new Date("2024-12-01T09:00:00Z"),
        "price": 50,
        "availableTickets": 5000,
        "bookedTickets": 3000
      },
      {
        "eventId": new ObjectId(),
        "eventName": "Tech Conference 2024",
        "eventDescription": "Annual tech conference with speakers from leading tech companies.",
        "eventLocation": "Grand Convention Center",
        "eventType": "Business",
        "eventStartDate": new Date("2024-11-20T09:00:00Z"),
        "eventEndDate": new Date("2024-11-22T17:00:00Z"),
        "eventOpen": new Date("2024-10-25T09:00:00Z"),
        "eventClose": new Date("2024-11-19T09:00:00Z"),
        "price": 200,
        "availableTickets": 1000,
        "bookedTickets": 600
      },
      {
        "eventId": new ObjectId(),
        "eventName": "Charity Run 2024",
        "eventDescription": "Participate in a 10K run to raise funds for local charities.",
        "eventLocation": "Central Park",
        "eventType": "Sports",
        "eventStartDate": new Date("2024-11-30T07:00:00Z"),
        "eventEndDate": new Date("2024-11-30T11:00:00Z"),
        "eventOpen": new Date("2024-11-01T09:00:00Z"),
        "eventClose": new Date("2024-11-29T09:00:00Z"),
        "price": 25,
        "availableTickets": 1000,
        "bookedTickets": 800
      },
      {
        "eventId": new ObjectId(),
        "eventName": "Cooking Workshop: Holiday Treats",
        "eventDescription": "Learn how to bake festive treats in this hands-on cooking workshop.",
        "eventLocation": "Culinary Arts Studio",
        "eventType": "Education",
        "eventStartDate": new Date("2024-12-10T10:00:00Z"),
        "eventEndDate": new Date("2024-12-10T14:00:00Z"),
        "eventOpen": new Date("2024-11-15T09:00:00Z"),
        "eventClose": new Date("2024-12-09T09:00:00Z"),
        "price": 60,
        "availableTickets": 50,
        "bookedTickets": 30
      },
      {
        "eventId": new ObjectId(),
        "eventName": "Film Festival: Indie Showcase",
        "eventDescription": "A selection of indie films from upcoming directors.",
        "eventLocation": "Downtown Cinema",
        "eventType": "Art & Culture",
        "eventStartDate": new Date("2024-12-15T12:00:00Z"),
        "eventEndDate": new Date("2024-12-17T22:00:00Z"),
        "eventOpen": new Date("2024-11-20T09:00:00Z"),
        "eventClose": new Date("2024-12-14T09:00:00Z"),
        "price": 25,
        "availableTickets": 300,
        "bookedTickets": 150
      },
      {
        "eventId": new ObjectId(),
        "eventName": "Jazz Night 2024",
        "eventDescription": "An evening of smooth jazz with renowned musicians.",
        "eventLocation": "City Music Hall",
        "eventType": "Music",
        "eventStartDate": new Date("2024-12-08T20:00:00Z"),
        "eventEndDate": new Date("2024-12-08T23:00:00Z"),
        "eventOpen": new Date("2024-11-01T09:00:00Z"),
        "eventClose": new Date("2024-12-07T09:00:00Z"),
        "price": 40,
        "availableTickets": 1000,
        "bookedTickets": 800
      },
      {
        "eventId": new ObjectId(),
        "eventName": "Leadership Summit 2024",
        "eventDescription": "A summit featuring leadership workshops and networking opportunities.",
        "eventLocation": "International Convention Center",
        "eventType": "Business",
        "eventStartDate": new Date("2024-12-05T09:00:00Z"),
        "eventEndDate": new Date("2024-12-06T17:00:00Z"),
        "eventOpen": new Date("2024-11-01T09:00:00Z"),
        "eventClose": new Date("2024-12-04T09:00:00Z"),
        "price": 300,
        "availableTickets": 500,
        "bookedTickets": 200
      },
      {
        "eventId": new ObjectId(),
        "eventName": "Basketball Tournament: Winter Cup",
        "eventDescription": "Watch top teams compete in the annual Winter Cup basketball tournament.",
        "eventLocation": "Sports Arena",
        "eventType": "Sports",
        "eventStartDate": new Date("2024-12-12T15:00:00Z"),
        "eventEndDate": new Date("2024-12-12T21:00:00Z"),
        "eventOpen": new Date("2024-11-20T09:00:00Z"),
        "eventClose": new Date("2024-12-11T09:00:00Z"),
        "price": 35,
        "availableTickets": 5000,
        "bookedTickets": 4000
      },
      {
        "eventId": new ObjectId(),
        "eventName": "Workshop: Digital Marketing Strategies",
        "eventDescription": "A comprehensive workshop on digital marketing for small businesses.",
        "eventLocation": "Tech Hub Auditorium",
        "eventType": "Education",
        "eventStartDate": new Date("2024-11-28T09:00:00Z"),
        "eventEndDate": new Date("2024-11-28T17:00:00Z"),
        "eventOpen": new Date("2024-11-01T09:00:00Z"),
        "eventClose": new Date("2024-11-27T09:00:00Z"),
        "price": 100,
        "availableTickets": 100,
        "bookedTickets": 75
      }
    ]
    

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

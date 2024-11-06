import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Event from './models/Event.js'; // Ensure this path is correct

dotenv.config();
const ObjectId = mongoose.Types.ObjectId;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database connected successfully.");
    
    // Sample event data
    const sampleEvents =[
      {
        eventId: new ObjectId(),
        eventName: "Impressionist Art Exhibit",
        eventDescription: "A collection of stunning Impressionist artworks from the 19th century.",
        eventGenre: "Museums",
        eventLocation: "National Gallery, Kuala Lumpur",
        eventType: "Chargeable",
        eventStartDate: new Date("2024-12-01"),
        eventEndDate: new Date("2024-12-31"),
        eventOpen: new Date("2024-12-01T10:00:00"),
        eventClose: new Date("2024-12-31T18:00:00"),
        eventPrice: 30,
        eventTicketQuantity: 500,
        eventTicketQuantityBooked: 0,
        userId: "user123",
      },
      {
        eventId: new ObjectId(),
        eventName: "Dinosaurs Unearthed",
        eventDescription: "An interactive museum exhibit featuring life-sized dinosaur models and fossils.",
        eventGenre: "Museums",
        eventLocation: "Science Museum, Penang",
        eventType: "Chargeable",
        eventStartDate: new Date("2024-11-15"),
        eventEndDate: new Date("2025-01-15"),
        eventOpen: new Date("2024-11-15T09:00:00"),
        eventClose: new Date("2025-01-15T17:00:00"),
        eventPrice: 25,
        eventTicketQuantity: 300,
        eventTicketQuantityBooked: 0,
        userId: "user456",
      },
      {
        eventId: new ObjectId(),
        eventName: "Contemporary Art Fair",
        eventDescription: "A showcase of contemporary art pieces from emerging and established artists.",
        eventGenre: "Exhibitions",
        eventLocation: "Art Center, Johor Bahru",
        eventType: "Free",
        eventStartDate: new Date("2024-11-20"),
        eventEndDate: new Date("2024-12-20"),
        eventOpen: new Date("2024-11-20T11:00:00"),
        eventClose: new Date("2024-12-20T19:00:00"),
        eventPrice: 0,
        eventTicketQuantity: 1000,
        eventTicketQuantityBooked: 0,
        userId: "user789",
      },
      {
        eventId: new ObjectId(),
        eventName: "Green Tech Expo",
        eventDescription: "Explore the latest advancements in green technology and sustainable solutions.",
        eventGenre: "Exhibitions",
        eventLocation: "Convention Center, Kuala Lumpur",
        eventType: "Chargeable",
        eventStartDate: new Date("2024-12-05"),
        eventEndDate: new Date("2024-12-10"),
        eventOpen: new Date("2024-12-05T09:00:00"),
        eventClose: new Date("2024-12-10T17:00:00"),
        eventPrice: 20,
        eventTicketQuantity: 2000,
        eventTicketQuantityBooked: 0,
        userId: "user321",
      },
      {
        eventId: new ObjectId(),
        eventName: "Ballet Under the Stars",
        eventDescription: "A magical evening of ballet performances in an open-air setting.",
        eventGenre: "Performances",
        eventLocation: "Botanical Gardens, Kuala Lumpur",
        eventType: "Free",
        eventStartDate: new Date("2024-11-25"),
        eventEndDate: new Date("2024-11-30"),
        eventOpen: new Date("2024-11-25T18:00:00"),
        eventClose: new Date("2024-11-30T21:00:00"),
        eventPrice: 0,
        eventTicketQuantity: 500,
        eventTicketQuantityBooked: 0,
        userId: "user654",
      },
      {
        eventId: new ObjectId(),
        eventName: "Symphony Orchestra Concert",
        eventDescription: "An evening of classical music performed by a world-renowned symphony orchestra.",
        eventGenre: "Performances",
        eventLocation: "Concert Hall, Penang",
        eventType: "Chargeable",
        eventStartDate: new Date("2024-12-10"),
        eventEndDate: new Date("2024-12-10"),
        eventOpen: new Date("2024-12-10T19:00:00"),
        eventClose: new Date("2024-12-10T22:00:00"),
        eventPrice: 100,
        eventTicketQuantity: 300,
        eventTicketQuantityBooked: 0,
        userId: "user987",
      },
      {
        eventId: new ObjectId(),
        eventName: "International Food Festival",
        eventDescription: "A celebration of global cuisines with food stalls, cooking demos, and tastings.",
        eventGenre: "Festivals",
        eventLocation: "City Square, Malacca",
        eventType: "Free",
        eventStartDate: new Date("2024-12-01"),
        eventEndDate: new Date("2024-12-03"),
        eventOpen: new Date("2024-12-01T10:00:00"),
        eventClose: new Date("2024-12-03T22:00:00"),
        eventPrice: 0,
        eventTicketQuantity: 1000,
        eventTicketQuantityBooked: 0,
        userId: "user852",
      },
      {
        eventId: new ObjectId(),
        eventName: "New Year's Eve Festival",
        eventDescription: "Ring in the new year with live music, fireworks, and festivities.",
        eventGenre: "Festivals",
        eventLocation: "Downtown, Kuala Lumpur",
        eventType: "Chargeable",
        eventStartDate: new Date("2024-12-31"),
        eventEndDate: new Date("2025-01-01"),
        eventOpen: new Date("2024-12-31T18:00:00"),
        eventClose: new Date("2025-01-01T02:00:00"),
        eventPrice: 50,
        eventTicketQuantity: 2000,
        eventTicketQuantityBooked: 0,
        userId: "user963",
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

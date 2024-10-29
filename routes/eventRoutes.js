// // import express from 'express';
// import mongoose from 'mongoose';
// import nodemailer from 'nodemailer';
// // import { getAllEvents, searchEvents, getEventById, createEvent } from '../controllers/eventController.js';
// // import Event from '../models/Event.js';
// // import Booking from '../models/Booking.js';
// // import User from '../models/User.js';  
// // import { createRequire } from 'module'; 

// // const router = express.Router();
// // const require = createRequire(import.meta.url); // Create require function

// // // // Function to send confirmation email
// // // const sendConfirmationEmail = async (userEmail, userName, eventName, ticketCount) => {
// // //   const transporter = nodemailer.createTransport({
// // //     service: 'gmail',
// // //     auth: {
// // //       user: process.env.EMAIL_USER,
// // //       pass: process.env.EMAIL_PASS,
// // //     },
// // //   });

// // //   const mailOptions = {
// // //     from: process.env.EMAIL_USER,
// // //     to: userEmail,
// // //     subject: 'Event Booking Confirmation',
// // //     text: `Hello ${userName},\n\nYou have successfully booked ${ticketCount} ticket(s) for the event: ${eventName}.\n\nThank you for booking with us!`,
// // //   };

// // //   try {
// // //     await transporter.sendMail(mailOptions);
// // //     console.log('Email sent successfully');
// // //   } catch (error) {
// // //     console.error('Error sending email:', error);
// // //     throw new Error('Error sending email');
// // //   }
// // // };

// // // Event Routes
// // router.get('/', getAllEvents); // Get all events (with optional type filter)
// // router.get('/search', searchEvents); // Search for events by name
// // router.get('/:id', getEventById); // Get specific event by ID
// // router.post('/', createEvent); // Create a new event

// // Get all events or apply filters (type, location, date)
// router.get('/events', async (req, res) => {
//   try {
//     const filters = {};
//     const { eventType, eventLocation, eventStartDate, availableTickets } = req.query;

//     // Apply filters if they exist
//     if (eventType) filters.eventType = eventType;
//     if (eventLocation) filters.eventLocation = eventLocation;
//     if (eventStartDate) filters.eventStartDate = eventStartDate;
//     if (date) {
//       const startDate = new Date(eventStartDate);
//       const endDate = new Date(eventEndDate);
//       endDate.setDate(endDate.getDate() + 1);
//       filters.eventStartDate = { $gte: startDate, $lt: endDate };
//     }

//     // Optional filter for events with available tickets
//     if (availableTickets) filters.availableTickets = { $gt: 0 };

//     // Fetch filtered events
//     const events = await Event.find(filters);
//     res.json(events);
//   } catch (error) {
//     console.error('Error retrieving events:', error);
//     res.status(500).json({ message: 'Error retrieving events' });
//   }
// });

// // Get specific event by ID
// router.get('/events/:id', async (req, res) => {
//   console.log(`Fetching event with ID: ${req.params.id}`);
//   try {
//     if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
//       return res.status(400).json({ message: 'Invalid event ID format' });
//     }

//     const event = await Event.findById(req.params.id);
//     if (!event) {
//       return res.status(404).json({ message: 'Event not found' });
//     }
//     res.json(event);
//   } catch (error) {
//     console.error('Error retrieving event:', error);
//     res.status(500).json({ message: 'Error retrieving event' });
//   }
// });





















// // Function to send confirmation email
// // const sendConfirmationEmail = async (userEmail, userName, eventName, ticketCount) => {
// //   const transporter = nodemailer.createTransport({
// //     service: 'gmail',
// //     auth: {
// //       user: process.env.EMAIL_USER,
// //       pass: process.env.EMAIL_PASS,
// //     },
// //   });

// //   const mailOptions = {
// //     from: process.env.EMAIL_USER,
// //     to: userEmail,
// //     subject: 'Event Booking Confirmation',
// //     text: `Hello ${userName},\n\nYou have successfully booked ${ticketCount} ticket(s) for the event: ${eventName}.\n\nThank you for booking with us!`,
// //   };

// //   try {
// //     await transporter.sendMail(mailOptions);
// //     console.log('Email sent successfully');
// //   } catch (error) {
// //     console.error('Error sending email:', error);
// //     throw new Error('Error sending email');
// //   }
// // };






// // Free Event Booking Route
// // router.post('/book', async (req, res) => {
// //   const { userName, userEmail, eventId, quantity } = req.body;

// //   console.log("Received booking request:", req.body);

//   try {
//     // Validate and convert eventId to ObjectId
//     if (!mongoose.Types.ObjectId.isValid(eventId)) {
//       console.error("Invalid eventId:", eventId);
//       return res.status(400).json({ message: 'Invalid eventId format' });
//     }

//     const objectId = new mongoose.Types.ObjectId(eventId); // Convert eventId to ObjectId
//     console.log("Converted eventId to ObjectId:", objectId);

//     // Find the event using the converted ObjectId
//     const event = await Event.findById(objectId);
//     console.log("Fetched Event:", event);

// //     if (!event) {
// //       console.error('Event not found:', eventId);
// //       return res.status(404).json({ message: 'Event not found' });
// //     }

// //     // Check if there are enough available tickets
// //     if (event.availableTickets < quantity) {
// //       console.error('Not enough tickets available:', event.availableTickets);
// //       return res.status(400).json({ message: 'Not enough tickets available' });
// //     }


// //     // Create the booking
// //     const booking = new Booking({
// //       userName,
// //       userEmail,
// //       event: event._id, // Use the internal _id of the event
// //       quantity,
// //     });
// //     await booking.save();

// //     // Update the event's available and booked tickets
// //     event.availableTickets -= quantity;
// //     event.bookedTickets += quantity;

// //     console.log("Before saving event:", {
// //       availableTickets: event.availableTickets,
// //       bookedTickets: event.bookedTickets,
// //       bookingQuantity: quantity
// //     });

// //     await event.save();

// //     // Send confirmation email for free event booking
// //     await sendConfirmationEmail(userEmail, userName, event.eventName, quantity); // Use the email service

// //     res.json({ message: 'Booking confirmed and email sent', booking });
// //   } catch (error) {
// //     console.error('Error booking event:', error);
// //     res.status(500).json({ message: 'Error booking event' });
// //   }
// // });

// // Chargeable Event Booking Route
// router.post('/book/chargeable', async (req, res) => {
//   const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
//   const { userName, userEmail, eventId, quantity, paymentMethodId, saveCard } = req.body;

//   try {
//     // Validate eventId and convert to ObjectId
//     if (!mongoose.Types.ObjectId.isValid(eventId)) {
//       console.error("Invalid eventId:", eventId);
//       return res.status(400).json({ message: 'Invalid eventId format' });
//     }
    
//     const objectId = new mongoose.Types.ObjectId(eventId);
//     const event = await Event.findById(objectId);

//     if (!event || event.availableTickets < quantity) {
//       return res.status(400).json({ message: 'Not enough tickets available or event not found' });
//     }

//     // Find or create user by email
//     let user = await User.findOrCreate(userEmail, userName);






//     // If the user doesn't have a Stripe customer ID, create a Stripe customer
//     if (!user.stripeCustomerId) {
//       const customer = await stripeInstance.customers.create({
//         email: userEmail,
//         name: userName,
//       });
//       user.stripeCustomerId = customer.id;
//       await user.save();
//     }

//     // Process the payment via Stripe
//     const totalAmount = event.price * quantity * 100; // Stripe expects amount in cents
//     const paymentIntent = await stripeInstance.paymentIntents.create({
//       amount: totalAmount,
//       currency: 'usd',
//       payment_method: paymentMethodId,
//       customer: user.stripeCustomerId, // Attach the payment to the customer
//       confirm: true,
//     });

//     // Save the booking information and update event ticket count
//     const booking = new Booking({
//       userName,
//       userEmail,
//       event: eventId,
//       quantity,
//       paymentId: paymentIntent.id, // Store the Stripe payment intent ID
//     });
//     await booking.save();

//     // Deduct available tickets
//     event.availableTickets -= quantity;
//     event.bookedTickets += quantity;
//     await event.save();

//     // Save card for future use if the user opted to save the card
//     if (saveCard) {
//       const paymentMethod = await stripeInstance.paymentMethods.attach(paymentMethodId, {
//         customer: user.stripeCustomerId,
//       });
//       user.paymentMethods.push(paymentMethod.id);
//       await user.save();
//     }

//     // Send confirmation email for chargeable event booking
//     await sendConfirmationEmail(userEmail, userName, event.eventName, quantity); // Use the email service
//     res.json({ message: 'Booking confirmed and email sent', booking });
//   } catch (error) {
//     console.error('Error booking event:', error);
//     if (error.type === 'StripeCardError') {
//       return res.status(400).json({ message: 'Payment failed. Please try another card.' });
//     }
//     res.status(500).json({ message: 'Error booking event' });
//   }
// });

// export default router;
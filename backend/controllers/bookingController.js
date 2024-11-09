// BUSINESS LOGIC FOR BOOKING ENTITY (CRUD)
// IMPORT NESCESSARY LIBRARIES
import { User } from "../models/User.js";
// import Event from "../models/Event.js";
import Booking from "../models/Booking.js";
import nodemailer from 'nodemailer';
import EventTicket from "../models/EventTicket.js";
//import { createStripeCustomer, createPaymentIntent } from "./stripeController.js";

//const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

// SUPPORTING FUNCTIONS RELATED TO BOOKING ENTITY
const sendConfirmationEmail = async (
  bookingName,
  bookingEmail,
  bookingQuantity,
  eventName
) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: bookingEmail,
    subject: "Event Booking Confirmation",
    text: `Hello ${bookingName},\n\nYou have successfully booked ${bookingQuantity} ${eventName} ticket(s) for the event.\n\nThank you for booking with us!`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error("Error sending email");
  }
};

// FUNCTION TO GET AVAILABLE TICKETS FOR AN EVENT TICKET
const getAvailableTickets = (eventTicket) => {
  return eventTicket.eventTicketQuantity - eventTicket.eventTicketQuantityBooked;
};

// VALIDATION FUNCTION FOR USER, EVENT, AND TICKET AVAILABILITY
export const validateBookingRequest = async (req, res) => {
  try {
    const { userId, eventId, bookingQuantity, eventTicketType } = req.body;

    // Check if the user exists
    const user = await User.findOne({ userId: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Check if the event ticket exists for the given eventId and eventTicketType
    const eventTicket = await EventTicket.findOne({
      eventId: eventId,
      eventTicketType: eventTicketType,
    });
    if (!eventTicket) {
      return res.status(404).json({ message: "Event ticket not found!" });
    }

    // Get the available ticket quantity
    const availableTickets = getAvailableTickets(eventTicket);

    // Check if there are enough tickets available
    if (availableTickets < bookingQuantity) {
      return res.status(400).json({
        message: "Selected Event Ticket does not have enough tickets available!",
        data: { availableTickets }
      });
    }

    // Send a successful response with validated user, event ticket, and available ticket quantity
    return res.status(200).json({
      message: "Validation successful!",
      data: { user, eventTicket, availableTickets },
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// FUNCTION TO CREATE BOOKING AND SEND CONFIRMATION EMAIL
export const createBookingAndSendEmail = async (req, res) => {
  try {
    const { userId, eventId, bookingQuantity, eventTicketType, eventTicketPrice } = req.body;

    // Find the user by userId
    const user = await User.findOne({ userId: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Find the event ticket by eventId and eventTicketType
    const eventTicket = await EventTicket.findOne({
      eventId: eventId,
      eventTicketType: eventTicketType, // Ensure the ticket type matches
    });

    if (!eventTicket) {
      return res.status(404).json({ message: "Event ticket not found." });
    }

    // Check if the provided eventTicketPrice matches the stored price
    if (eventTicket.eventTicketPrice !== eventTicketPrice) {
      return res.status(400).json({ message: "Event ticket price mismatch." });
    }

    // Check if the quantity to be booked is available
    if (eventTicket.eventTicketQuantity - eventTicket.eventTicketQuantityBooked < bookingQuantity) {
      return res.status(400).json({ message: "Not enough tickets available." });
    }

    // Create a new booking document associated with the eventTicket
    const newBooking = new Booking({
      bookingName: user.userName,
      bookingEmail: user.userEmail,
      bookingQuantity: bookingQuantity,
      eventId: eventId, // Store eventId from the request body
      eventTicketId: eventTicket.eventTicketId, // Store event ticket ID from the EventTicket
      userId: userId, // Store userId from the request body
      eventTicketPrice: eventTicketPrice, // Include the ticket price in the booking
    });

    // Save the new booking to the database
    await newBooking.save();

    // Update the event ticket's booked quantity
    eventTicket.eventTicketQuantityBooked += bookingQuantity;
    await eventTicket.save();

    // Send confirmation email
    await sendConfirmationEmail(
      newBooking.bookingName,
      newBooking.bookingEmail,
      bookingQuantity,
      eventTicket.eventTicketType, // Send the ticket type in the confirmation email
      eventTicket.eventId // Send the eventId for context in the email
    );

    // Respond with booking details
    return res.status(201).json({
      message: "Successfully booked tickets! A confirmation email has been sent to your email!",
      booking: newBooking,
    });
  } catch (error) {
    // Handle errors
    return res.status(400).json({ message: error.message });
  }
};


// // CREATING NEW BOOKING OBJECT (FREE)
// export const createFreeBooking = async (req, res) => {
//   // SELECTIVELY EXTRACT FIELD INPUTS RELEVANT TO FUNCTION CREATEFREEBOOKING
//   const { eventId, bookingQuantity, userId } = req.body;

//   try {
//     // CHECKING IF USERID EXISTS IN USER COLLECTION
//     const user = await User.findOne({ userId: userId });
//     if (!user) {
//       return res.status(404).json({ message: "User not found!" });
//     }

//     // CHECKING IF EVENTID EXISTS IN EVENT COLLECTION
//     const event = await Event.findOne({ eventId: eventId });
//     if (!event) {
//       return res.status(404).json({ message: "Event not found!" });
//     }

//     // CHECKING IF EVENT HAS ENOUGH TICKETS AVAILABLE
//     if (
//       event.eventTicketQuantity - event.eventTicketQuantityBooked <
//       bookingQuantity
//     ) {
//       return res
//         .status(400)
//         .json({ message: "Selected Event does not enough tickets available!" });
//     }
//     // INSTANTIATING NEW BOOKING OBJECT
//     const newBooking = new Booking({
//       bookingName: user.userName,
//       bookingEmail: user.userEmail,
//       bookingQuantity: bookingQuantity,
//       eventId: eventId,
//       userId: userId,
//     });

//     // SAVE NEW BOOKING OBJECT TO DATABASE
//     await newBooking.save();

//     // UPDATE EVENT OBJECT'S EVENTTICKETQUANTITYBOOKED ATTRIBUTE
//     event.eventTicketQuantityBooked += bookingQuantity;
//     await event.save();

//     // SENDING CONFIRMATION EMAIL
//     await sendConfirmationEmail(
//       newBooking.bookingName,
//       newBooking.bookingEmail,
//       bookingQuantity,
//       event.eventName
//     );

//     res.status(201).json({ message: "Successfully booked tickets!" });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// export const createChargeableBooking = async (req, res) => {
//   const { eventId, bookingQuantity, paymentMethodId, saveCard, userId, totalAmount } = req.body;

//   try {
//     // Find user and event in the database
//     const user = await User.findOne({ userId: userId });
//     if (!user) return res.status(404).json({ message: "User not found!" });

//     const event = await Event.findOne({ eventId: eventId });
//     if (!event) return res.status(404).json({ message: "Event not found!" });

//     // Check ticket availability
//     if (event.eventTicketQuantity - event.eventTicketQuantityBooked < bookingQuantity) {
//       return res.status(400).json({ message: "Not enough tickets available!" });
//     }

//     // Create Stripe customer if needed
//     const customerStripeId = await createStripeCustomer(user);
//     if (!customerStripeId) return res.status(500).json({ message: "Failed to create Stripe customer" });

//     // Create payment intent
//     const paymentIntent = await createPaymentIntent(totalAmount, "sgd", customerStripeId);
//     if (!paymentIntent) return res.status(500).json({ message: "Failed to create payment intent" });

//      // Confirm the payment intent
//     if (paymentIntent.status === 'succeeded') {
//       // Create new booking object
//       const newBooking = new Booking({
//         bookingName: user.userName,
//         bookingEmail: user.userEmail,
//         eventId: eventId,
//         bookingQuantity: bookingQuantity,
//         paymentId: paymentIntent.id,
//       });

//       const savedBooking = await newBooking.save();

//       // Update event booked ticket quantity
//       event.bookedTickets += bookingQuantity;
//       await event.save();

//       // Attach and save payment method if saveCard is true
//       if (saveCard) {
//         const paymentMethod = await attachPaymentMethod(paymentMethodId, customerStripeId);
//         user.userPaymentMethods.push(paymentMethod.id);
//         await user.save();
//       }

//       // Send confirmation email
//       await sendConfirmationEmail(
//         savedBooking.bookingName,
//         savedBooking.bookingEmail,
//         savedBooking.bookingQuantity,
//         event.eventName
//       );

//       return res.status(201).json({ message: "Successfully booked tickets!" });
//     } else {
//       return res.status(400).json({ message: "Payment not successful. Please try again." });
//     }
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };


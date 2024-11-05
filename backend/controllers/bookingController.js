// BUSINESS LOGIC FOR BOOKING ENTITY (CRUD)
// IMPORT NESCESSARY LIBRARIES
import { User } from "../models/User.js";
import Event from "../models/Event.js";
import Booking from "../models/Booking.js";
import nodemailer from 'nodemailer';
import { createStripeCustomer, createPaymentIntent, attachPaymentMethod, } from "./stripeController.js";

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
    text: `Hello ${bookingName},\n\nYou have successfully booked ${bookingQuantity} ticket(s) for the event: ${eventName}.\n\nThank you for booking with us!`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error("Error sending email");
  }
};

// CREATING NEW BOOKING OBJECT (FREE)
export const createFreeBooking = async (req, res) => {
  // SELECTIVELY EXTRACT FIELD INPUTS RELEVANT TO FUNCTION CREATEFREEBOOKING
  const { eventId, bookingQuantity, userId } = req.body;

  try {
    // CHECKING IF USERID EXISTS IN USER COLLECTION
    const user = await User.findOne({ userId: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // CHECKING IF EVENTID EXISTS IN EVENT COLLECTION
    const event = await Event.findOne({ eventId: eventId });
    if (!event) {
      return res.status(404).json({ message: "Event not found!" });
    }

    // CHECKING IF EVENT HAS ENOUGH TICKETS AVAILABLE
    if (
      event.eventTicketQuantity - event.eventTicketQuantityBooked <
      bookingQuantity
    ) {
      return res
        .status(400)
        .json({ message: "Selected Event does not enough tickets available!" });
    }
    // INSTANTIATING NEW BOOKING OBJECT
    const newBooking = new Booking({
      bookingName: user.userName,
      bookingEmail: user.userEmail,
      bookingQuantity: bookingQuantity,
      eventId: eventId,
      userId: userId,
    });

    // SAVE NEW BOOKING OBJECT TO DATABASE
    await newBooking.save();

    // UPDATE EVENT OBJECT'S EVENTTICKETQUANTITYBOOKED ATTRIBUTE
    event.eventTicketQuantityBooked += bookingQuantity;
    await event.save();

    // SENDING CONFIRMATION EMAIL
    await sendConfirmationEmail(
      newBooking.bookingName,
      newBooking.bookingEmail,
      bookingQuantity,
      event.eventName
    );

    res.status(201).json({ message: "Successfully booked tickets!" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const createChargeableBooking = async (req, res) => {
  const { eventId, bookingQuantity, paymentMethodId, saveCard, userId, totalAmount } = req.body;

  try {
    // Find user and event in the database
    const user = await User.findOne({ userId: userId });
    if (!user) return res.status(404).json({ message: "User not found!" });

    const event = await Event.findOne({ eventId: eventId });
    if (!event) return res.status(404).json({ message: "Event not found!" });

    // Check ticket availability
    if (event.eventTicketQuantity - event.eventTicketQuantityBooked < bookingQuantity) {
      return res.status(400).json({ message: "Not enough tickets available!" });
    }

    // Create Stripe customer if needed
    const customerStripeId = await createStripeCustomer(user);

    // Create payment intent
    const paymentIntent = await createPaymentIntent(totalAmount, "sgd", customerStripeId);

    // Create new booking object
    const newBooking = new Booking({
      bookingName: user.userName,
      bookingEmail: user.userEmail,
      eventId: eventId,
      bookingQuantity: bookingQuantity,
      paymentId: paymentIntent.id,
    });

    const savedBooking = await newBooking.save();

    // Update event booked ticket quantity
    event.bookedTickets += bookingQuantity;
    await event.save();

    // Attach and save payment method if saveCard is true
    if (saveCard) {
      const paymentMethod = await attachPaymentMethod(paymentMethodId, customerStripeId);
      user.userPaymentMethods.push(paymentMethod.id);
      await user.save();
    }

    // Send confirmation email
    await sendConfirmationEmail(
      savedBooking.bookingName,
      savedBooking.bookingEmail,
      savedBooking.bookingQuantity,
      event.eventName
    );

    res.status(201).json({ message: "Successfully booked tickets!" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

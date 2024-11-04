// BUSINESS LOGIC FOR BOOKING ENTITY (CRUD)
// IMPORT NESCESSARY LIBRARIES
import { User } from "../models/User.js";
import Event from "../models/Event.js";
import Booking from "../models/Booking.js";
import nodemailer from 'nodemailer';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

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

// CREATING NEW BOOKING OBJECT (CHARGEABLE)
export const createChargeableBooking = async (req, res) => {
  // SELECTIVELY EXTRACT FIELD INPUTS RELEVANT TO FUNCTION CREATECHARGEABLEBOOKING
  const { eventId, bookingQuantity, paymentMethodId, saveCard, userId, totalAmount } =
    req.body;

  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

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
        .json({ message: "Selected Event does not have enough tickets available!" });
    }

    // CREATE USERSTRIPEID FOR USER OBJECT, IF USER OBJECT DOES NOT HAVE USERSTRIPEID
    if (!user.userStripeId) {
      const stripeCustomer = await stripe.customers.create({
        email: user.userEmail,
        name: user.userName,
      });
      user.userStripeId = stripeCustomer.id;

      // SAVE UPDATED USER OBJECT INTO DATABASE
      await user.save();
    }

    // PROCESS PAYMENT VIA STRIPE
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount * 100, // Convert amount to cents
      currency: "usd",
      payment_method: paymentMethodId,
      customer: user.userStripeId, // Attach the payment to the customer
      confirm: true,
    });

    // INSTANTIATE NEW BOOKING OBJECT
    const newBooking = new Booking({
      bookingName: user.userName,
      bookingEmail: user.userEmail,
      eventId: eventId,
      bookingQuantity: bookingQuantity,
      paymentId: paymentIntent.id, // Store the Stripe payment intent ID
    });

    // SAVE NEW BOOKING OBJECT TO DATABASE
    const savedBooking = await newBooking.save();

    // UPDATE EVENT OBJECT'S EVENTTICKETQUANTITYBOOKED ATTRIBUTE
    event.bookedTickets += bookingQuantity;
    const savedEvent = await event.save();

    // SAVE CARD FOR FUTURE USE, SHOULD USER OPTED FOR IT
    let savedCard = null;
    if (saveCard) {
      const paymentMethod = await stripe.paymentMethods.attach(
        paymentMethodId,
        {
          customer: user.userStripeId,
        }
      );
      user.userPaymentMethods.push(paymentMethod.id);

      // SAVE UPDATED USER OBJECT
      savedCard = await user.save();
    }

    // SENDING CONFIRMATION EMAIL
    await sendConfirmationEmail(
      savedBooking.bookingName,
      savedBooking.bookingEmail,
      savedBooking.bookingQuantity,
      event.eventName
    );

    res.status(201).json({
      message: "Successfully booked tickets!",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

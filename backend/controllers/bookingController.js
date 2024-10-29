// BUSINESS LOGIC FOR BOOKING ENTITY (CRUD)
// IMPORT NESCESSARY LIBRARIES
import { User } from "../models/User.js";
import Event from "../models/Event.js";
import Booking from "../models/Booking.js";
import { v4 as uuidv4 } from "uuid";

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

// CREATING NEW INSTANCE OF BOOKING ENTITY (FREE)
export const createFreeBooking = async (req, res) => {
  const { eventId, bookingQuantity, bookingName, bookingEmail } = req.body;

  try {
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

    const newBooking = new Booking({
      bookingName,
      bookingEmail,
      bookingQuantity,
      eventId,
    });

    const savedBooking = await newBooking.save();

    event.eventTicketQuantityBooked += bookingQuantity;
    const updatedEvent = await event.save();

    // SENDING CONFIRMATION EMAIL
    const confirmedBooking = await sendConfirmationEmail(
      bookingName,
      bookingEmail,
      bookingQuantity,
      event.eventName
    );

    res.status(201).json({
      booking: savedBooking,
      event: updatedEvent,
      confirmedBooking: confirmedBooking,
    });
  } catch (error) {
    res.status(400).json({ message: error.message }); // Handle validation errors
  }
};

// CREATING NEW INSTANCE OF BOOKING ENTITY (CHARGEABLE)
export const createChargeableBooking = async (req, res) => {
  const {
    eventId,
    bookingQuantity,
    bookingName,
    bookingEmail,
    paymentMethodId,
    saveCard,
  } = req.body;

  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

  try {
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

    // RETRIEVING USER ENTITY USING BOOKINGEMAIL
    const user = await User.findOne({ email: bookingEmail });

    // CREATE STRIPE CUSTOMER FOR USER ENTITY, IF USER ENTITY DOES NOT HAVE STRIPE CUSTOMER ID
    if (!user.stripeCustomerId) {
      const stripeCustomer = await stripeInstance.customers.create({
        email: bookingEmail,
        name: bookingName,
      });
      user.stripeCustomerId = stripeCustomer.id;
      await user.save();
    }

    // PROCESS PAYMENT VIA STRIPE
    const totalAmount = event.price * bookingQuantity * 100; // Stripe expects amount in cents
    const paymentIntent = await stripeInstance.paymentIntents.create({
      amount: totalAmount,
      currency: "usd",
      payment_method: paymentMethodId,
      customer: user.stripeCustomerId, // Attach the payment to the customer
      confirm: true,
    });

    // SAVE BOOKING INFORMATION
    const newBooking = new Booking({
      userName,
      userEmail,
      event: eventId,
      quantity,
      paymentId: paymentIntent.id, // Store the Stripe payment intent ID
    });
    const savedBooking = await newBooking.save();

    // UPDATE EVENTTICKETBOOKED IN EVENT ENTITY INSTANCE
    event.bookedTickets += quantity;
    const savedEvent = await event.save();

    // SAVE CARD FOR FUTURE USE, SHOULD USER OPTED FOR IT
    let savedCard = null;
    if (saveCard) {
      const paymentMethod = await stripeInstance.paymentMethods.attach(
        paymentMethodId,
        {
          customer: user.stripeCustomerId,
        }
      );
      user.paymentMethods.push(paymentMethod.id);
      savedCard = await user.save();
    }

    // SENDING CONFIRMATION EMAIL
    const confirmedBooking = await sendConfirmationEmail(
      bookingName,
      bookingEmail,
      bookingQuantity,
      event.eventName
    );

    res.status(201).json({
      booking: savedBooking,
      event: savedEvent,
      card: savedCard,
      confirmedBooking: confirmedBooking,
    });
  } catch (error) {
    res.status(400).json({ message: error.message }); // Handle validation errors
  }
};

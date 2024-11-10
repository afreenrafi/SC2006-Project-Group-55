// IMPORT NECESSARY LIBRARIES
import express from "express";

import {
  validateBookingRequest,
  createBookingAndSendEmail,
  getTicketBooked
} from "../controllers/bookingController.js";

// INSTANTIATE ROUTER
const router = express.Router();

// DEFINE ROUTES FOR BOOKING ENTITY

// // CREATE
// router.post("/bookFree", createFreeBooking);
// router.post("/bookChargeable", createChargeableBooking);

// CREATE
router.post("/validateBookingRequest", validateBookingRequest);
router.post("/createBookingAndSendEmail", createBookingAndSendEmail);
router.get("/getTicketBooked/:userId", getTicketBooked);


export default router;

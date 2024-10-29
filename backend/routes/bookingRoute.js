// IMPORT NECESSARY LIBRARIES
import express from "express";
import {
  createFreeBooking,
  createChargeableBooking,
} from "../controllers/bookingController.js";

// INSTANTIATE ROUTER
const router = express.Router();

// DEFINE ROUTES FOR BOOKING ENTITY

// CREATE
router.post("/bookFree", createFreeBooking);
router.post("/bookChargeable", createChargeableBooking);

export default router;

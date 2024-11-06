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

router.get('/profile', isAuth, (req, res) => {
  res.status(200).json({message: "Access granted.", userId: req.userId}); 
}); //Importing the session token for userId 

export default router;

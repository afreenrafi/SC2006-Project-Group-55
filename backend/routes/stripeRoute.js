// IMPORT NECESSARY LIBRARIES
import express from "express";
import { createStripeCustomer, createPaymentIntent } from "../controllers/stripeController.js";


// INSTANTIATE ROUTER
const router = express.Router();

// CREATE
router.post("/createStripeCustomer", createStripeCustomer);
router.post("/createPaymentIntent", createPaymentIntent);

export default router;
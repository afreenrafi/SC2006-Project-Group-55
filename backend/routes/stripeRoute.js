// IMPORT NECESSARY LIBRARIES
import express from "express";
import { createStripeCustomer, createPaymentIntent, attachPaymentMethod, } from "../controllers/stripeController.js";


// INSTANTIATE ROUTER
const router = express.Router();

// CREATE
router.post("/createStripeCustomer", createStripeCustomer);
router.post("/createPaymentIntent", createPaymentIntent);
router.post("/attachPaymentMethod", attachPaymentMethod);

export default router;
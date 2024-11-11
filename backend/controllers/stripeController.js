// stripeController.js
import { createRequire } from 'module';
import { User } from "../models/User.js";

const require = createRequire(import.meta.url);

// Create a new Stripe customer if the user doesn’t have one
export const createStripeCustomer = async (req, res) => {
    try {
      const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
      const { userId } = req.body; // Get userId from req.body
  
      // Check if userId is provided
      if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
      }
  
      // Fetch user from the database using userId
      const user = await User.findOne({ userId });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      // Check if the user's email and name are available
      if (!user.userEmail || !user.userName) {
        return res.status(400).json({ error: "User email or name is missing" });
      }
  
      // Check if user already has a Stripe ID
      if (!user.userStripeId) {
        try {
          // Create a new Stripe customer
          const stripeCustomer = await stripe.customers.create({
            email: user.userEmail,
            name: user.userName,
          });
  
          // Assign the Stripe customer ID to the user and save
          user.userStripeId = stripeCustomer.id;
          await user.save();
        } catch (stripeError) {
          // Handle errors related to Stripe customer creation
          return res.status(500).json({
            error: `Failed to create Stripe customer: ${stripeError.message}`,
          });
        }
      }
  
      // Return the user's Stripe ID if creation or retrieval is successful
      return res.status(200).json({ stripeId: user.userStripeId });
    } catch (error) {
      // Handle any unexpected errors
      return res.status(500).json({
        error: `Internal server error: ${error.message}`,
      });
    }
};



// Create a payment intent
export const createPaymentIntent = async (req, res) => {
    try {
      const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
      const { amount, currency, customerStripeId } = req.body; // Get data from req.body
  
      // Check if amount, currency, and customerStripeId are provided
      if (!amount || typeof amount !== "number" || amount <= 0) {
        return res.status(400).json({ error: "Invalid or missing amount" });
      }
      if (!currency || typeof currency !== "string") {
        return res.status(400).json({ error: "Invalid or missing currency" });
      }
      if (!customerStripeId || typeof customerStripeId !== "string") {
        return res.status(400).json({ error: "Invalid or missing customerStripeId" });
      }
  
      // Create the payment intent
      let paymentIntent;
      try {
        paymentIntent = await stripe.paymentIntents.create({
          amount: amount * 100, // Convert amount to cents
          currency: currency,
          automatic_payment_methods: {
            enabled: true,
          },
          customer: customerStripeId,
        });
      } catch (stripeError) {
        return res.status(500).json({
          error: `Failed to create payment intent: ${stripeError.message}`,
        });
      }
  
      // Create an ephemeral key
      let ephemeralKey;
      try {
        ephemeralKey = await stripe.ephemeralKeys.create(
          { customer: customerStripeId }, // Use customerStripeId here
          { apiVersion: "2024-09-30.acacia" }
        );
      } catch (stripeKeyError) {
        return res.status(500).json({
          error: `Failed to create ephemeral key: ${stripeKeyError.message}`,
        });
      }
  
      // Return payment intent and ephemeral key in a single object
      return res.status(200).json({
        paymentIntent,
        ephemeralKey: ephemeralKey.secret,
      });
    } catch (error) {
      // Handle any unexpected errors
      return res.status(500).json({
        error: `Internal server error: ${error.message}`,
      });
    }
};  
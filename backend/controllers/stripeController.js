// stripeController.js
import { createRequire } from 'module';
import { User } from "../models/User.js";

const require = createRequire(import.meta.url);

// Create a new Stripe customer if the user doesn’t have one
export const createStripeCustomer = async (req, res) => {
    try {
        const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
        const { userId } = req.body; // Get userId from req.body

        // Fetch user from the database using userId
        const user = await User.findOne({ userId });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Check if user already has a Stripe ID
        if (!user.userStripeId) {
            const stripeCustomer = await stripe.customers.create({
                email: user.userEmail,
                name: user.userName,
            });
            user.userStripeId = stripeCustomer.id;

            // Save the updated user object with the new Stripe ID
            await user.save();
        }

        return res.status(200).json({ stripeId: user.userStripeId });
    } catch (error) {
        return res.status(500).json({ error: `Failed to create Stripe customer: ${error.message}` });
    }
};

// Create a payment intent
export const createPaymentIntent = async (req, res) => {
    try {
        const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
        const { amount, currency, customerStripeId } = req.body; // Get data from req.body

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // Convert amount to cents
            currency: currency,
            automatic_payment_methods: {
                enabled: true,
            },
            customer: customerStripeId,
        });
        return res.status(200).json(paymentIntent);
    } catch (error) {
        return res.status(500).json({ error: `Failed to create payment intent: ${error.message}` });
    }
};

// Attach payment method to a customer and save for future use
export const attachPaymentMethod = async (req, res) => {
    try {
        const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
        const { paymentMethodId, customerStripeId } = req.body; // Get data from req.body

        const paymentMethod = await stripe.paymentMethods.attach(paymentMethodId, {
            customer: customerStripeId,
        });
        return res.status(200).json(paymentMethod);
    } catch (error) {
        return res.status(500).json({ error: `Failed to attach payment method: ${error.message}` });
    }
};

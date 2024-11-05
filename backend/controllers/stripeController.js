// stripeController.js
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Create a new Stripe customer if the user doesn’t have one
const createStripeCustomer = async (user) => {
  if (!user.userStripeId) {
    const stripeCustomer = await stripe.customers.create({
      email: user.userEmail,
      name: user.userName,
    });
    user.userStripeId = stripeCustomer.id;
    await user.save(); // Save the updated user object with the new Stripe ID
  }
  return user.userStripeId;
};

// Create a payment intent
const createPaymentIntent = async (amount, currency, customerStripeId) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100, // Convert amount to cents
    currency: currency,
    automatic_payment_methods: {
      enabled: true,
    },
    customer: customerStripeId,
  });
  return paymentIntent;
};

// Attach payment method to a customer and save for future use
const attachPaymentMethod = async (paymentMethodId, customerStripeId) => {
  const paymentMethod = await stripe.paymentMethods.attach(paymentMethodId, {
    customer: customerStripeId,
  });
  return paymentMethod;
};

module.exports = {
  createStripeCustomer,
  createPaymentIntent,
  attachPaymentMethod,
};

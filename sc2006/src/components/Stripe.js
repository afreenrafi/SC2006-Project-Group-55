import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

// Load the Stripe publishable key (use your own publishable key)
const stripePromise = loadStripe('your_publishable_key_here');

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      'client_secret_from_backend', // Get this from your backend response
      {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: 'Cardholder Name',
          },
        },
      }
    );

    if (error) {
      console.log('[error]', error);
    } else {
      console.log('[PaymentIntent]', paymentIntent);
      setPaymentSuccess(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
      {paymentSuccess && <p>Payment successful!</p>}
    </form>
  );
};

export default function App() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}

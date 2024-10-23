const stripe = Stripe('pk_test_51QAT4iFJii7b5f1yg8TXWw5pk1snYe3SzS1yRsD50msnjFX70C1lpRXHN5h3OO7gsjEGmbVEpJyRvpLOAQp1M90r003Sn6VETM'); // Use your publishable key
const cardElement = elements.create('card'); // Create a card element

cardElement.mount('#card-element'); // Mount the card element to the DOM

const form = document.getElementById('payment-form');
form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Replace this with your fetch call to your backend to create the payment intent
    const response = await fetch('/create-payment-intent', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: 5000 }), // Send the amount to the server
    });

    const { clientSecret } = await response.json(); // Get the client secret from the response

    // Confirm the payment with the client secret
    const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
            card: cardElement,
            billing_details: {
                name: 'Customer Name', // Optional
            },
        },
    });

    if (result.error) {
        // Show error to your customer (e.g., insufficient funds)
        console.error(result.error.message);
    } else {
        // The payment has been processed!
        if (result.paymentIntent.status === 'succeeded') {
            console.log('Payment succeeded!');
            // Optionally redirect to a success page or show a success message
        }
    }
});

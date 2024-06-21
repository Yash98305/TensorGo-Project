import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const stripePromise = loadStripe('your-publishable-key-here');

const CheckoutForm = ({ totalAmount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const card = elements.getElement(CardElement);
    const result = await stripe.createPaymentMethod({
      type: 'card',
      card: card,
    });

    if (result.error) {
      setError(result.error.message);
    } else {
      const paymentIntent = await axios.post('/api/payments/create-payment-intent', {
        amount: totalAmount,
      });

      const confirmed = await stripe.confirmCardPayment(paymentIntent.data.clientSecret, {
        payment_method: result.paymentMethod.id,
      });

      if (confirmed.error) {
        setError(confirmed.error.message);
      } else {
        alert('Payment successful!');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay ${totalAmount}
      </button>
      {error && <div>{error}</div>}
    </form>
  );
};

const Checkout = ({ totalAmount }) => (
  <Elements stripe={stripePromise}>
    <CheckoutForm totalAmount={totalAmount} />
  </Elements>
);

export default Checkout;

// Payment.js
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import '../css/Payment.css';

const stripePromise = loadStripe('your-publishable-key-from-stripe');

const CheckoutForm = ({ totalPrice = 0, cart, userId }) => { // Set a default value of 0 for totalPrice
  const stripe = useStripe();
  const elements = useElements();
  const [paymentMessage, setPaymentMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      console.error('Stripe.js has not loaded yet.');
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      console.error('Card Element not found.');
      return;
    }

    setLoading(true);

    const receipt = {
      date: new Date().toISOString(),
      amount: totalPrice,
      items: cart.map((item) => ({
        title: item.title,
        price: item.price,
        quantity: item.quantity,
      })),
    };

    try {
      const userResponse = await fetch(`http://localhost:5001/users/${userId}`);
      if (!userResponse.ok) {
        throw new Error('Failed to fetch user data.');
      }

      const userData = await userResponse.json();
      const updatedReceipts = userData.receipts ? [...userData.receipts, receipt] : [receipt];

      const response = await fetch(`http://localhost:5001/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ receipts: updatedReceipts }),
      });

      if (response.ok) {
        setPaymentMessage('Payment successful! Receipt saved.');
      } else {
        setPaymentMessage('Failed to save receipt. Please try again.');
      }
    } catch (error) {
      console.error('Error adding receipt:', error);
      setPaymentMessage('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <h2>Order Details</h2>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            {item.title} - ${item.price} x {item.quantity}
          </li>
        ))}
      </ul>
      <h3>Total: ${totalPrice.toFixed(2)}</h3>
      <CardElement options={{ style: { base: { fontSize: '18px', color: '#333' } } }} />
      <button type="submit" disabled={!stripe || loading}>
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
      {paymentMessage && <p className="payment-message">{paymentMessage}</p>}
    </form>
  );
};

const Payment = () => {
  const location = useLocation();
  const { cart, totalPrice, userId } = location.state || { cart: [], totalPrice: 0, userId: null };

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm totalPrice={totalPrice} cart={cart} userId={userId} />
    </Elements>
  );
};

export default Payment;
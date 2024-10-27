// Order.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Order.css';
import { useAuth } from '/Users/ahmedbehery/Desktop/Projects/fake-store-app/src/AuthContext.jsx';

const Order = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const cart = location.state?.cart || [];

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleConfirmOrder = () => {
    if (!user?.id) {
      console.error("User ID is missing. Ensure the user is logged in.");
      return;
    }
    console.log('Navigating to payment with totalPrice:', totalPrice); // Debugging line
    navigate('/payment', { state: { cart, totalPrice, userId: user.id } });
  };

  return (
    <div className="order-page">
      <h1 className="text-center">Order Summary</h1>

      {cart.length > 0 ? (
        <div className="order-summary">
          <ul className="list-group mb-4">
            {cart.map((item, index) => (
              <li key={index} className="list-group-item">
                <img src={item.image} alt={item.title} style={{ width: '50px', height: '50px', marginRight: '10px' }} />
                <div>
                  <h5>{item.title}</h5>
                  <p>Category: {item.category}</p>
                  <p>Price: ${item.price} x {item.quantity}</p>
                </div>
              </li>
            ))}
          </ul>
          <h3 className="text-end">Total Price: ${totalPrice.toFixed(2)}</h3>
          <button onClick={handleConfirmOrder} className="btn btn-success mt-4">Confirm Order</button>
        </div>
      ) : (
        <p className="text-center">No items in the cart.</p>
      )}
    </div>
  );
};

export default Order;
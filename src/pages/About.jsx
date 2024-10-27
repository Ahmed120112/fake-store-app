// About.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/About.css';


const About = () => {
  return (
    <div className="about-page container my-5">
      <h1 className="text-center mb-4">About Us</h1>
      <p className="lead">
        Welcome to Fake Store! We are your one-stop destination for a wide range of products, from fashion to electronics, jewelry, and more. Our goal is to offer high-quality products at affordable prices, ensuring a seamless and enjoyable shopping experience.
      </p>
      <h3>Our Mission</h3>
      <p>
        Our mission is to provide our customers with a convenient, reliable, and enjoyable shopping platform where they can find everything they need. We are dedicated to delivering exceptional value and customer satisfaction.
      </p>
      <h3>Our Values</h3>
      <ul>
        <li>Customer Satisfaction</li>
        <li>Quality Products</li>
        <li>Affordable Prices</li>
        <li>Fast Delivery</li>
        <li>Trust and Reliability</li>
      </ul>
      <p>
        Thank you for choosing Fake Store. We look forward to serving you and helping you find everything you need in one place.
      </p>
    </div>
  );
};

export default About;
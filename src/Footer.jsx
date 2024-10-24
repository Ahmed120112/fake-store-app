import React, { Component } from 'react';
import './Footer.css';  // Importing the CSS for the footer

export default class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <p>&copy; 2024 My E-Commerce Store. All rights reserved.</p>
        <ul className="footer-links">
          <li><a href="/privacy">Privacy Policy</a></li>
          <li><a href="/terms">Terms of Service</a></li>
          <li><a href="/contact">Contact Us</a></li>
        </ul>
      </footer>
    );
  }
}
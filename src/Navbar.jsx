import React, { Component } from 'react';
import './Navbar.css';  

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenuOpen: false,
    };
  }

  toggleMenu = () => {
    this.setState((prevState) => ({ isMenuOpen: !prevState.isMenuOpen }));
  };

  render() {
    return (
      <nav className="navbar">
        <h1 className="navbar-head">My E-Commerce Store</h1>
        <div className="navbar-toggle" onClick={this.toggleMenu}>
          &#9776; 
        </div>
        <ul className={`navbar-links ${this.state.isMenuOpen ? 'open' : ''}`}>
          <li><a href="/">Home</a></li>
          <li><a href="/products">Products</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
    );
  }
}
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';
import '../css/Navbar.css';
import { useAuth } from '../../AuthContext'; // Use the useAuth hook instead

class Navbar extends Component {
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
    const { isMenuOpen } = this.state;
    const { user, logout } = this.props; // Access user and logout from props

    return (
      <nav className="navbar">
        {/* Logo Section */}
        <div className="navbar-logo">
          <img src={logo} alt="Store Logo" />
          <h1 className="navbar-head">My E-Commerce Store</h1>
        </div>
        {/* Toggle Button */}
        <div className="navbar-toggle" onClick={this.toggleMenu}>
          &#9776; {/* Hamburger Icon */}
        </div>
        {/* Navbar Links */}
        <ul className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>

          {/* Conditional rendering for Login/Register or User/Logout */}
          {user ? (
            <>
              <li className="navbar-user">Welcome, {user.name}</li>
              <li>
                <button onClick={logout} className="btn btn-outline-light navbar-btn">Logout</button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login" className="btn-login">Login</Link></li>
              <li><Link to="/register" className="btn-register">Register</Link></li>
            </>
          )}
        </ul>
      </nav>
    );
  }
}

// Wrap the Navbar component with a functional component to use the hook
const NavbarWithAuth = () => {
  const { user, logout } = useAuth(); // Access the useAuth hook
  return <Navbar user={user} logout={logout} />;
};

export default NavbarWithAuth;
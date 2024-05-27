// src/components/Navbar.js
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signOutUser } from '../firebase';
import { clearUser } from '../features/userSlice';
import './Navbar.css';

const Navbar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = () => {
    signOutUser();
    dispatch(clearUser());
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getCurrentPageName = () => {
    switch (location.pathname) {
      case '/your-word-list':
        return 'Your Word List';
      case '/word-to-learn':
        return 'Word to Learn';
      default:
        return 'Home';
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-header">
        <div className="page-title">{getCurrentPageName()}</div>
        <div className="hamburger-menu" onClick={toggleMenu}>
          &#9776;
        </div>
      </div>
      <ul className={`navbar-list ${isMenuOpen ? 'open' : ''}`}>
        <li className="navbar-item"><Link to="/" onClick={toggleMenu}>Home</Link></li>
        <li className="navbar-item"><Link to="/your-word-list" onClick={toggleMenu}>Your Word List</Link></li>
        <li className="navbar-item"><Link to="/word-to-learn" onClick={toggleMenu}>Word to Learn</Link></li>
        <li className="navbar-item"><button onClick={() => {handleSignOut(); toggleMenu();}}>Sign Out</button></li>
      </ul>
    </nav>
  );
};

export default Navbar;

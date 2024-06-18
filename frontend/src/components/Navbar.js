// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signOutUser } from '../firebase';
import { clearUser } from '../features/userSlice';
import './Navbar.css';

const Navbar = () => {
  const dispatch = useDispatch();

  const handleSignOut = () => {
    signOutUser();
    dispatch(clearUser());
  };

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item"><Link to="/">Home</Link></li>
        <li className="navbar-item"><Link to="/home-english">Home (English)</Link></li>
        <li className="navbar-item"><Link to="/your-word-list">Your Word List</Link></li>
        <li className="navbar-item"><Link to="/word-to-learn">Word to Learn</Link></li>
        <li className="navbar-item"><Link to="/word-to-learn-english">Word to Learn (Dutch-English)</Link></li> {/* Add new link */}
        <li className="navbar-item"><Link to="/your-word-list-english">Your Word List (Dutch-English)</Link></li> {/* Add new link */}
        <li className="navbar-item"><Link to="/spreken">Spreken</Link></li>
        <li className="navbar-item"><Link to="/spreken-known">Bekende Vragen</Link></li>
        <li className="navbar-item"><Link to="/flashcards">Flashcards</Link></li>
        <li className="navbar-item"><button onClick={handleSignOut}>Sign Out</button></li>
      </ul>
    </nav>
  );
};

export default Navbar;

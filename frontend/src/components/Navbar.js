// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signOutUser } from '../firebase';
import { clearUser } from '../features/userSlice';
// import { selectLanguage } from '../features/languageSlice';
import './Navbar.css';

const Navbar = () => {
  const dispatch = useDispatch();
  // const language = useSelector(selectLanguage);

  const handleSignOut = () => {
    signOutUser();
    dispatch(clearUser());
  };

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item"><Link to="/">Select Language</Link></li>
        <li className="navbar-item"><Link to="/home">Home</Link></li>
        <li className="navbar-item"><Link to="/word-to-learn">Word to Learn</Link></li>
        <li className="navbar-item"><Link to="/your-word-list">Your Word List</Link></li>
        <li className="navbar-item"><Link to="/spreken">Spreken</Link></li>
        <li className="navbar-item"><Link to="/spreken-known">Bekende Vragen</Link></li>
        <li className="navbar-item"><button onClick={handleSignOut}>Sign Out</button></li>
      </ul>
    </nav>
  );
};

export default Navbar;

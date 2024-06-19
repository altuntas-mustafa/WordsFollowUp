// src/components/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signOutUser } from '../firebase';
import { clearUser } from '../features/userSlice';
import { setLanguage, selectLanguage } from '../features/languageSlice';
import './Navbar.css';

const Navbar = () => {
  const dispatch = useDispatch();
  const language = useSelector(selectLanguage);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSignOut = () => {
    signOutUser();
    dispatch(clearUser());
  };

  const handleLanguageSelect = (language) => {
    dispatch(setLanguage(language));
    setShowDropdown(false);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <div className="language-dropdown">
            <button onClick={toggleDropdown} className="language-button">
              <img
                src={language === 'turkish'
                  ? "https://upload.wikimedia.org/wikipedia/commons/b/b4/Flag_of_Turkey.svg"
                  : "https://static.vecteezy.com/system/resources/previews/000/388/356/original/illustration-of-uk-flag-vector.jpg"}
                alt="Flag"
                className="flag-icon"
              />
              {language === 'turkish' ? 'Turkish' : 'English'}
            </button>
            {showDropdown && (
              <div className="dropdown-content">
                <button onClick={() => handleLanguageSelect('turkish')} className="dropdown-item">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/b/b4/Flag_of_Turkey.svg"
                    alt="Turkish Flag"
                    className="flag-icon"
                  />
                  Turkish
                </button>
                <button onClick={() => handleLanguageSelect('english')} className="dropdown-item">
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/000/388/356/original/illustration-of-uk-flag-vector.jpg"
                    alt="English Flag"
                    className="flag-icon"
                  />
                  English
                </button>
              </div>
            )}
          </div>
        </li>
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

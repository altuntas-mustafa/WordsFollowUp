import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signOutUser } from '../firebase';
import { clearUser } from '../features/userSlice';
import { setLanguage, selectLanguage } from '../features/languageSlice';
import './Navbar.css';

const Navbar = () => {
  const dispatch = useDispatch();
  const language = useSelector(selectLanguage);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOutUser();
    dispatch(clearUser());
    setIsMenuOpen(false); // Close the menu
  };

  const handleLanguageSelect = (language) => {
    dispatch(setLanguage(language));
    setShowDropdown(false);
    setIsMenuOpen(false); // Close the menu
    navigate('/word-to-learn');
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
    if (showDropdown === false) {
      setIsMenuOpen(false); // Close the hamburger menu if opening the dropdown
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isMenuOpen === false) {
      setShowDropdown(false); // Close the dropdown if opening the hamburger menu
    }
  };

  const handleMenuItemClick = () => {
    setIsMenuOpen(false); // Close the menu
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
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
        <div className={`navbar-menu ${isMenuOpen ? 'open' : ''}`}>
          <ul className="navbar-list">
            <li className="navbar-item"><Link to="/" onClick={handleMenuItemClick}>Home</Link></li>
            <li className="navbar-item"><Link to="/word-to-learn" onClick={handleMenuItemClick}>Word to Learn</Link></li>
            <li className="navbar-item"><Link to="/your-word-list" onClick={handleMenuItemClick}>Your Word List</Link></li>
            <li className="navbar-item"><Link to="/spreken" onClick={handleMenuItemClick}>Spreken</Link></li>
            <li className="navbar-item"><Link to="/spreken-known" onClick={handleMenuItemClick}>Bekende Vragen</Link></li>
            <li className="navbar-item"><button onClick={handleSignOut}>Sign Out</button></li>
          </ul>
        </div>
        <div className="hamburger" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

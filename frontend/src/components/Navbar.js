import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signOutUser } from '../firebase';
import { clearUser } from '../features/userSlice';
import { setLanguage, selectLanguage } from '../features/languageSlice';
import './Navbar.css';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const language = useSelector(selectLanguage);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = () => {
    signOutUser();
    dispatch(clearUser());
    navigate('/');  // Navigate to home after sign out
  };

  const handleLanguageSelect = (selectedLanguage) => {
    dispatch(setLanguage(selectedLanguage));
    setShowDropdown(false);
    setIsMenuOpen(false);  // Close the hamburger menu when a language is selected
    navigate('/');  // Navigate to home after changing language
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="language-dropdown">
          <button onClick={toggleDropdown} className="language-button">
            <img
              src={language === 'turkish'
                ? "https://upload.wikimedia.org/wikipedia/commons/b/b4/Flag_of_Turkey.svg"
                : language === 'english'
                ? "https://static.vecteezy.com/system/resources/previews/000/388/356/original/illustration-of-uk-flag-vector.jpg"
                : "https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Spain.svg"}
              alt="Flag"
              className="flag-icon"
            />
            {language === 'turkish' ? 'Turkish' : language === 'english' ? 'English' : 'Spanish'}
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
              <button onClick={() => handleLanguageSelect('spanish')} className="dropdown-item">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Spain.svg"
                  alt="Spanish Flag"
                  className="flag-icon"
                />
                Spanish
              </button>
            </div>
          )}
        </div>
        <div className={`navbar-menu ${isMenuOpen ? 'open' : ''}`}>
          <ul className="navbar-list">
            <li className="navbar-item"><Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
            <li className="navbar-item"><Link to="/word-to-learn" onClick={() => setIsMenuOpen(false)}>Word to Learn</Link></li>
            <li className="navbar-item"><Link to="/your-word-list" onClick={() => setIsMenuOpen(false)}>Your Word List</Link></li>
            <li className="navbar-item"><Link to="/spreken" onClick={() => setIsMenuOpen(false)}>Spreken</Link></li>
            <li className="navbar-item"><Link to="/spreken-known" onClick={() => setIsMenuOpen(false)}>Bekende Vragen</Link></li>
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

  // src/components/LanguageSelection.js
  import React from 'react';
  import { useDispatch } from 'react-redux';
  import { useNavigate } from 'react-router-dom';
  import { setLanguage } from '../features/languageSlice';
  // import './LanguageSelection.css';

  const LanguageSelection = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLanguageSelect = (language) => {
      dispatch(setLanguage(language));
      navigate(`/home`);
    };

    return (
      <div className="language-selection-container">
        <h1>Select Language</h1>
        <button onClick={() => handleLanguageSelect('turkish')} className="language-button">Turkish</button>
        <button onClick={() => handleLanguageSelect('english')} className="language-button">English</button>
      </div>
    );
  };

  export default LanguageSelection;

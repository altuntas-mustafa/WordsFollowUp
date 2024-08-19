import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectLanguage } from '../features/languageSlice';
import './Flashcards.css';

const Flashcards = () => {
  const location = useLocation();
  const words = location.state?.words || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const language = useSelector(selectLanguage); // Fetch the selected language

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const currentWord = words[currentIndex];

  return (
    <div className="flashcards-container">
      <h1>Flashcards</h1>
      {words.length === 0 ? (
        <p>No words available for flashcards</p>
      ) : (
        <div className="flashcard-container">
          <div className={`flashcard ${isFlipped ? 'is-flipped' : ''}`} onClick={handleFlip}>
            {!isFlipped ? (
              <div className="flashcard-front">
                <div className="word-section">
                  <span className="label">{language === 'turkish' ? 'Turkish' : language === 'english' ? 'English' : 'Spanish'}:</span>
                  <span className={language === 'turkish' ? 'turkish' : language === 'english' ? 'english' : 'spanish'}>
                    {language === 'turkish' ? currentWord.Turks : language === 'english' ? currentWord.Engels : currentWord.Spanish}
                  </span>
                </div>
                <div className="word-section">
                  <span className="label">Hoe te lezen:</span>
                  <span className="dutch">{currentWord.HoeTeLezen}</span>
                </div>
                {language === 'spanish' && (
                  <div className="word-section">
                    <span className="label">Cómo leer:</span>
                    <span className="spanish">{currentWord.Cómo_leer}</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="flashcard-back">
                <div className="word-section">
                  <span className="label">Dutch:</span>
                  <span className="dutch">{currentWord.Nederlands}</span>
                </div>
                <div className="word-section">
                  <span className="label">Example sentence (Dutch):</span>
                  <span className="dutch">{currentWord.Voorbeeldzin_Nederlands}</span>
                </div>
                <div className="word-section">
                  <span className="label">Example sentence ({language === 'turkish' ? 'Turkish' : language === 'english' ? 'English' : 'Spanish'}):</span>
                  <span className={language === 'turkish' ? 'turkish' : language === 'english' ? 'english' : 'spanish'}>
                    {language === 'turkish' ? currentWord.OrnekCumleTurkce : language === 'english' ? currentWord.ExampleSentenceEnglish : currentWord.Ejemplo_de_oración_Español}
                  </span>
                </div>
              </div>
            )}
          </div>
          <button onClick={handleNext} className="next-button">Next</button>
        </div>
      )}
    </div>
  );
};

export default Flashcards;

// src/components/Flashcards.js
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
  const language = useSelector(selectLanguage); // Get the selected language
  const [direction, setDirection] = useState(
    language === 'turkish' ? 'dutch-to-turkish' : 'dutch-to-english'
  ); // Default direction based on language

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleDirectionChange = (event) => {
    setDirection(event.target.value);
    setIsFlipped(false);
  };

  const currentWord = words[currentIndex];

  return (
    <div className="flashcards-container">
      <h1>Flashcards</h1>
      <div className="direction-select">
        <label htmlFor="direction">Select direction: </label>
        <select id="direction" value={direction} onChange={handleDirectionChange}>
          {language === 'turkish' ? (
            <>
              <option value="dutch-to-turkish">Dutch to Turkish</option>
              <option value="turkish-to-dutch">Turkish to Dutch</option>
            </>
          ) : (
            <>
              <option value="dutch-to-english">Dutch to English</option>
              <option value="english-to-dutch">English to Dutch</option>
            </>
          )}
        </select>
      </div>
      {words.length === 0 ? (
        <p>No words available for flashcards</p>
      ) : (
        <div className="flashcard-container">
          <div className={`flashcard ${isFlipped ? 'is-flipped' : ''}`} onClick={handleFlip}>
            {direction === 'dutch-to-turkish' ? (
              <>
                <div className="flashcard-front">
                  <div className="word-section">
                    <span className="label">Dutch:</span>
                    <span className="dutch">{currentWord.Nederlands}</span>
                  </div>
                  <div className="word-section">
                    <span className="label">Hoe te lezen:</span>
                    <span className="dutch">{currentWord.HoeTeLezen}</span>
                  </div>
                  <div className="word-section">
                    <span className="label">Example sentence (Dutch):</span>
                    <span className="dutch">{currentWord.Voorbeeldzin_Nederlands}</span>
                  </div>
                </div>
                <div className="flashcard-back">
                  <div className="word-section">
                    <span className="label">Turkish:</span>
                    <span className="turkish">{currentWord.Turks}</span>
                  </div>
                  <div className="word-section">
                    <span className="label">Okunuş:</span>
                    <span className="turkish">{currentWord.Okunus}</span>
                  </div>
                  <div className="word-section">
                    <span className="label">Example sentence (Turkish):</span>
                    <span className="turkish">{currentWord.OrnekCumleTurkce}</span>
                  </div>
                </div>
              </>
            ) : direction === 'turkish-to-dutch' ? (
              <>
                <div className="flashcard-front">
                  <div className="word-section">
                    <span className="label">Turkish:</span>
                    <span className="turkish">{currentWord.Turks}</span>
                  </div>
                  <div className="word-section">
                    <span className="label">Okunuş:</span>
                    <span className="turkish">{currentWord.Okunus}</span>
                  </div>
                  <div className="word-section">
                    <span className="label">Example sentence (Turkish):</span>
                    <span className="turkish">{currentWord.OrnekCumleTurkce}</span>
                  </div>
                </div>
                <div className="flashcard-back">
                  <div className="word-section">
                    <span className="label">Dutch:</span>
                    <span className="dutch">{currentWord.Nederlands}</span>
                  </div>
                  <div className="word-section">
                    <span className="label">Hoe te lezen:</span>
                    <span className="dutch">{currentWord.HoeTeLezen}</span>
                  </div>
                  <div className="word-section">
                    <span className="label">Example sentence (Dutch):</span>
                    <span className="dutch">{currentWord.Voorbeeldzin_Nederlands}</span>
                  </div>
                </div>
              </>
            ) : direction === 'dutch-to-english' ? (
              <>
                <div className="flashcard-front">
                  <div className="word-section">
                    <span className="label">Dutch:</span>
                    <span className="dutch">{currentWord.Nederlands}</span>
                  </div>
                  <div className="word-section">
                    <span className="label">Hoe te lezen:</span>
                    <span className="dutch">{currentWord.HoeTeLezen}</span>
                  </div>
                  <div className="word-section">
                    <span className="label">Example sentence (Dutch):</span>
                    <span className="dutch">{currentWord.Voorbeeldzin_Nederlands}</span>
                  </div>
                </div>
                <div className="flashcard-back">
                  <div className="word-section">
                    <span className="label">English:</span>
                    <span className="english">{currentWord.Engels}</span>
                  </div>
                  <div className="word-section">
                    <span className="label">Example sentence (English):</span>
                    <span className="english">{currentWord.ExampleSentenceEnglish}</span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flashcard-front">
                  <div className="word-section">
                    <span className="label">English:</span>
                    <span className="english">{currentWord.Engels}</span>
                  </div>
                  <div className="word-section">
                    <span className="label">Example sentence (English):</span>
                    <span className="english">{currentWord.ExampleSentenceEnglish}</span>
                  </div>
                </div>
                <div className="flashcard-back">
                  <div className="word-section">
                    <span className="label">Dutch:</span>
                    <span className="dutch">{currentWord.Nederlands}</span>
                  </div>
                  <div className="word-section">
                    <span className="label">Hoe te lezen:</span>
                    <span className="dutch">{currentWord.HoeTeLezen}</span>
                  </div>
                  <div className="word-section">
                    <span className="label">Example sentence (Dutch):</span>
                    <span className="dutch">{currentWord.Voorbeeldzin_Nederlands}</span>
                  </div>
                </div>
              </>
            )}
          </div>
          <button onClick={handleNext} className="next-button">Next</button>
        </div>
      )}
    </div>
  );
};

export default Flashcards;

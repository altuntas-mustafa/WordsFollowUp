// src/components/Flashcards.js
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Flashcards.css';

const Flashcards = () => {
  const location = useLocation();
  const words = location.state?.words || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

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
          </div>
          <button onClick={handleNext} className="next-button">Next</button>
        </div>
      )}
    </div>
  );
};

export default Flashcards;

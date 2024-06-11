// src/components/Spreken.js
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import './Spreken.css';

const Spreken = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showAnswers, setShowAnswers] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      const querySnapshot = await getDocs(collection(db, 'spoken_documents'));
      const questionsList = querySnapshot.docs.map(doc => doc.data());
      setQuestions(questionsList);
      if (questionsList.length > 0) {
        setCurrentIndex(0);
      }
    };

    fetchQuestions();
  }, []);

  const handleCheckAnswer = () => {
    setShowAnswers(true);
  };

  const handleNextQuestion = () => {
    setShowAnswers(false);
    setUserAnswer('');
    setCurrentIndex((prevIndex) => (prevIndex + 1) % questions.length);
  };

  const currentQuestion = questions[currentIndex];

  return (
    <div className="spreken-container">
      <h1>Spreken Oefening</h1>
      {currentQuestion && (
        <>
          <div className="question-section">
            <p className="question">{currentQuestion.question}</p>
            <textarea
              className="answer-input"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Typ hier uw antwoord..."
            />
            <button onClick={handleCheckAnswer} className="check-button">Controleer</button>
          </div>
          {showAnswers && (
            <div className="answers-section">
              <h2>Mogelijke Antwoorden:</h2>
              <ul>
                {currentQuestion.answers.map((answer, index) => (
                  <li key={index}>{answer}</li>
                ))}
              </ul>
              <button onClick={handleNextQuestion} className="next-button">Volgende</button>
            </div>
          )}
        </>
      )}
      {questions.length === 0 && <p>Geen vragen beschikbaar</p>}
    </div>
  );
};

export default Spreken;

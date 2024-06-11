// src/components/Spreken.js
import React, { useEffect, useState } from 'react';
import { collection, getDocs, updateDoc, arrayUnion, doc, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import './Spreken.css';

const Spreken = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showAnswers, setShowAnswers] = useState(false);
  const email = useSelector(selectUser);

  useEffect(() => {
    const fetchQuestions = async () => {
      const q = query(collection(db, 'spoken_documents'), where('knownBy', 'not-in', [email]));
      const querySnapshot = await getDocs(q);
      const questionsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setQuestions(questionsList);
      if (questionsList.length > 0) {
        setCurrentIndex(0);
      }
    };

    fetchQuestions();
  }, [email]);

  const handleCheckAnswer = () => {
    setShowAnswers(true);
  };

  const handleNextQuestion = () => {
    setShowAnswers(false);
    setUserAnswer('');
    setCurrentIndex((prevIndex) => (prevIndex + 1) % questions.length);
  };

  const handleMarkAsKnown = async () => {
    const currentQuestion = questions[currentIndex];
    const questionRef = doc(db, 'spoken_documents', currentQuestion.id);
    await updateDoc(questionRef, {
      knownBy: arrayUnion(email)
    });
    handleNextQuestion();
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
              <button onClick={handleMarkAsKnown} className="next-button">Ik weet dit</button>
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

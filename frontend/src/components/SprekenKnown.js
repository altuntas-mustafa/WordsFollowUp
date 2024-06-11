// src/components/SprekenKnown.js
import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import './Spreken.css';

const SprekenKnown = () => {
  const [questions, setQuestions] = useState([]);
  const email = useSelector(selectUser);

  useEffect(() => {
    const fetchQuestions = async () => {
      const q = query(collection(db, 'spoken_documents'), where('knownBy', 'array-contains', email));
      const querySnapshot = await getDocs(q);
      const questionsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setQuestions(questionsList);
    };

    fetchQuestions();
  }, [email]);

  return (
    <div className="spreken-container">
      <h1>Bekende Vragen</h1>
      {questions.length === 0 ? (
        <p>Geen bekende vragen</p>
      ) : (
        <div className="questions-list">
          {questions.map((question, index) => (
            <div key={index} className="question-item">
              <div className="question-section">
                <p className="question">{question.question}</p>
                <h2>Mogelijke Antwoorden:</h2>
                <ul>
                  {question.answers.map((answer, i) => (
                    <li key={i}>{answer}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SprekenKnown;

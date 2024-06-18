// src/components/HomeEnglish.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectUser } from '../features/userSlice';
import { fetchWordsEnglish, selectUnlearnedWordsEnglish } from '../features/wordsEnglishSlice';
import './Home.css';

const HomeEnglish = () => {
  const dispatch = useDispatch();
  const email = useSelector(selectUser);
  const allUnlearnedWordsEnglish = useSelector((state) => selectUnlearnedWordsEnglish(state, email));
  const [wordsEnglish, setWordsEnglish] = useState([]);
  const statusEnglish = useSelector((state) => state.wordsEnglish.status);

  useEffect(() => {
    dispatch(fetchWordsEnglish());
  }, [dispatch]);

  useEffect(() => {
    if (allUnlearnedWordsEnglish.length > 0) {
      setWordsEnglish(allUnlearnedWordsEnglish.slice(0, 10));
    }
  }, [allUnlearnedWordsEnglish]);

  return (
    <div className="home-container">
      <h1>Welcome</h1>
      <h2>Your Target for Today (Dutch-English)</h2>
      <p>Learn these 10 words today. If you need flashcards, let's practice here <Link to="/flashcards" state={{ words: wordsEnglish }}>here</Link>.</p>
      {statusEnglish === 'loading' && <p className="loading">Loading...</p>}
      {statusEnglish === 'failed' && <p className="error">Failed to load words.</p>}
      {statusEnglish === 'success' && (
        <>
          {wordsEnglish.length === 0 ? (
            <p className="no-words">No words to learn</p>
          ) : (
            <ul className="words-list">
              {wordsEnglish.map((word) => (
                <li key={word.id} className="word-item">
                  <div className="word-section">
                    <span className="label">Dutch:</span>
                    <span className="dutch">{word.Nederlands}</span>
                  </div>
                  <div className="word-section">
                    <span className="label">English:</span>
                    <span className="english">{word.Engels}</span>
                  </div>
                  <div className="word-section">
                    <span className="label">Hoe te lezen:</span>
                    <span className="dutch">{word.HoeTeLezen}</span>
                  </div>
                  <div className="word-section">
                    <span className="label">Example sentence (Dutch):</span>
                    <span className="dutch">{word.Voorbeeldzin_Nederlands}</span>
                  </div>
                  <div className="word-section">
                    <span className="label">Example sentence (English):</span>
                    <span className="english">{word.ExampleSentenceEnglish}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default HomeEnglish;

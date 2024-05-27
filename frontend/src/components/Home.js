// src/components/Home.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectUser } from '../features/userSlice';
import { fetchWords, selectUnlearnedWords } from '../features/wordsSlice';
import './Home.css';

const Home = () => {
  const dispatch = useDispatch();
  const email = useSelector(selectUser);
  const allUnlearnedWords = useSelector((state) => selectUnlearnedWords(state, email));
  const [words, setWords] = useState([]);
  const status = useSelector((state) => state.words.status);

  useEffect(() => {
    dispatch(fetchWords());
  }, [dispatch]);

  useEffect(() => {
    if (allUnlearnedWords.length > 0) {
      setWords(allUnlearnedWords.slice(0, 10));
    }
  }, [allUnlearnedWords]);

  return (
    <div className="home-container">
      <h1>Welcome</h1>
      <h2>Your Target for Today</h2>
      <p>Learn these 10 words today. If you need flashcards, let's practice here <Link to="/flashcards" state={{ words }}>here</Link>.</p>
      {status === 'loading' && <p className="loading">Loading...</p>}
      {status === 'failed' && <p className="error">Failed to load words.</p>}
      {status === 'success' && (
        <>
          {words.length === 0 ? (
            <p className="no-words">No words to learn</p>
          ) : (
            <ul className="words-list">
              {words.map((word) => (
                <li key={word.id} className="word-item">
                  <div className="word-section">
                    <span className="label">Dutch:</span>
                    <span className="dutch">{word.Nederlands}</span>
                  </div>
                  <div className="word-section">
                    <span className="label">Turkish:</span>
                    <span className="turkish">{word.Turks}</span>
                  </div>
                  <div className="word-section">
                    <span className="label">Hoe te lezen:</span>
                    <span className="dutch">{word.HoeTeLezen}</span>
                  </div>
                  <div className="word-section">
                    <span className="label">Okunuş:</span>
                    <span className="turkish">{word.Okunus}</span>
                  </div>
                  <div className="word-section">
                    <span className="label">Example sentence (Dutch):</span>
                    <span className="dutch">{word.VoorbeeldzinNederlands}</span>
                  </div>
                  <div className="word-section">
                    <span className="label">Example sentence (Turkish):</span>
                    <span className="turkish">{word.OrnekCumleTurkce}</span>
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

export default Home;

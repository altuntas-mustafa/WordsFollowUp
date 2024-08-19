// src/components/Home.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectUser } from '../features/userSlice';
import { selectLanguage } from '../features/languageSlice';
import { fetchWords, selectUnlearnedWords } from '../features/wordsSlice';
import { fetchWordsEnglish, selectUnlearnedWordsEnglish } from '../features/wordsEnglishSlice';
import { fetchWordsSpanish, selectUnlearnedWordsSpanish } from '../features/wordsSpanishSlice'; // Import Spanish words slice
import './Home.css';

const Home = () => {
  const dispatch = useDispatch();
  const email = useSelector(selectUser);
  const language = useSelector(selectLanguage);
  const [words, setWords] = useState([]);

  const status = useSelector((state) =>
    language === 'turkish' ? state.words.status :
    language === 'english' ? state.wordsEnglish.status :
    state.wordsSpanish.status // Add Spanish status
  );

  const allUnlearnedWords = useSelector((state) =>
    language === 'turkish' ? selectUnlearnedWords(state, email) :
    language === 'english' ? selectUnlearnedWordsEnglish(state, email) :
    selectUnlearnedWordsSpanish(state, email) // Add Spanish words selection
  );

  useEffect(() => {
    if (language === 'turkish') {
      dispatch(fetchWords());
    } else if (language === 'english') {
      dispatch(fetchWordsEnglish());
    } else if (language === 'spanish') {
      dispatch(fetchWordsSpanish());
    }
  }, [dispatch, language]);

  useEffect(() => {
    if (status === 'success' && words.length === 0 && allUnlearnedWords.length > 0) {
      setWords(allUnlearnedWords.slice(0, 10));
    }
  }, [status, allUnlearnedWords, words.length]);

  return (
    <div className="home-container">
      <h1>Welcome</h1>
      <h2>Your Target for Today</h2>
      <p>
        Learn these 10 words today. If you need flashcards, let's practice{' '}
        <Link to="/flashcards" state={{ words }}>
          here
        </Link>.
      </p>
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
                    <span className="label">{language === 'turkish' ? 'Turkish' : language === 'english' ? 'English' : 'Spanish'}:</span>
                    <span className={language === 'turkish' ? 'turkish' : language === 'english' ? 'english' : 'spanish'}>
                      {language === 'turkish' ? word.Turks : language === 'english' ? word.Engels : word.Spanish}
                    </span>
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
                    <span className="label">Example sentence ({language === 'turkish' ? 'Turkish' : language === 'english' ? 'English' : 'Spanish'}):</span>
                    <span className={language === 'turkish' ? 'turkish' : language === 'english' ? 'english' : 'spanish'}>
                      {language === 'turkish' ? word.OrnekCumleTurkce : language === 'english' ? word.ExampleSentenceEnglish : word.ExampleSentenceSpanish}
                    </span>
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

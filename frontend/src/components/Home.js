// src/components/Home.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectUser } from '../features/userSlice';
import { selectLanguage } from '../features/languageSlice';
import { fetchWords, selectUnlearnedWords } from '../features/wordsSlice';
import { fetchWordsEnglish, selectUnlearnedWordsEnglish } from '../features/wordsEnglishSlice';
import './Home.css';

const Home = () => {
  const dispatch = useDispatch();
  const email = useSelector(selectUser);
  const language = useSelector(selectLanguage);
  const [words, setWords] = useState([]);
  
  const status = useSelector((state) =>
    language === 'turkish' ? state.words.status : state.wordsEnglish.status
  );

  const allUnlearnedWords = useSelector((state) =>
    language === 'turkish' ? selectUnlearnedWords(state, email) : selectUnlearnedWordsEnglish(state, email)
  );

  useEffect(() => {
    if (language === 'turkish') {
      dispatch(fetchWords());
    } else {
      dispatch(fetchWordsEnglish());
    }
  }, [dispatch, language]);

  useEffect(() => {
    if (status === 'success' && words.length === 0) {
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
                    <span className="label">{language === 'turkish' ? 'Turkish' : 'English'}:</span>
                    <span className={language === 'turkish' ? 'turkish' : 'english'}>
                      {language === 'turkish' ? word.Turks : word.Engels}
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
                    <span className="label">Example sentence ({language === 'turkish' ? 'Turkish' : 'English'}):</span>
                    <span className={language === 'turkish' ? 'turkish' : 'english'}>
                      {language === 'turkish' ? word.OrnekCumleTurkce : word.ExampleSentenceEnglish}
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

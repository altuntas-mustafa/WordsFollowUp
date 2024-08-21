import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectUser } from '../features/userSlice';
import { selectLanguage } from '../features/languageSlice';
import { fetchWords, selectUnlearnedWords } from '../features/wordsSlice';
import { fetchWordsEnglish, selectUnlearnedWordsEnglish } from '../features/wordsEnglishSlice';
import { fetchWordsSpanish, selectUnlearnedWordsSpanish } from '../features/wordsSpanishSlice';
import './Home.css';

const Home = () => {
  const dispatch = useDispatch();
  const email = useSelector(selectUser);
  const language = useSelector(selectLanguage);
  const [words, setWords] = useState([]);

  const status = useSelector((state) =>
    language === 'turkish' ? state.words.status :
    language === 'english' ? state.wordsEnglish.status :
    state.wordsSpanish.status
  );

  const allUnlearnedWords = useSelector((state) =>
    language === 'turkish' ? selectUnlearnedWords(state, email) :
    language === 'english' ? selectUnlearnedWordsEnglish(state, email) :
    selectUnlearnedWordsSpanish(state, email)
  );

  useEffect(() => {
    // Clear the words state when the language changes
    setWords([]);

    if (language === 'turkish') {
      dispatch(fetchWords());
    } else if (language === 'english') {
      dispatch(fetchWordsEnglish());
    } else {
      dispatch(fetchWordsSpanish());
    }
  }, [dispatch, language]);

  useEffect(() => {
    // Update words when status is 'success' and unlearned words are available
    if (status === 'success' && allUnlearnedWords.length > 0) {
      setWords(allUnlearnedWords.slice(0, 10));
    }
  }, [status, allUnlearnedWords]);

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
                      {language === 'turkish' ? word.Turks : language === 'english' ? word.English : word.Spanish}
                    </span>
                  </div>
                  <div className="word-section">
                    <span className="label">Hoe te lezen:</span>
                    <span className="dutch">{word.HoeTeLezen}</span>
                  </div>
                  {language === 'spanish' && (
                    <div className="word-section">
                      <span className="label">Cómo leer:</span>
                      <span className="spanish">{word.Cómo_leer}</span>
                    </div>
                  )}
                  {language === 'turkish' && (
                    <div className="word-section">
                      <span className="label">Okunuş:</span>
                      <span className="turkish">{word.Okunus}</span>
                    </div>
                  )}
                  {language === 'english' && (
                    <div className="word-section">
                      <span className="label">How to read:</span>
                      <span className="english">{word.How_to_read}</span>
                    </div>
                  )}
                  <div className="word-section">
                    <span className="label">Example sentence (Dutch):</span>
                    <span className="dutch">{word.Voorbeeldzin_Nederlands}</span>
                  </div>
                  <div className="word-section">
                    <span className="label">Example sentence ({language === 'turkish' ? 'Turkish' : language === 'english' ? 'English' : 'Spanish'}):</span>
                    <span className={language === 'turkish' ? 'turkish' : language === 'english' ? 'english' : 'spanish'}>
                      {language === 'turkish' ? word.OrnekCumleTurkce : language === 'english' ? word.Example_sentence_English : word.Ejemplo_de_oración_Español}
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

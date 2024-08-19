// src/components/WordToLearn.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { selectLanguage } from '../features/languageSlice';
import { fetchWords, markWordAsLearned, selectUnlearnedWords } from '../features/wordsSlice';
import { fetchWordsEnglish, markWordAsLearnedEnglish, selectUnlearnedWordsEnglish } from '../features/wordsEnglishSlice';
import { fetchWordsSpanish, markWordAsLearnedSpanish, selectUnlearnedWordsSpanish } from '../features/wordsSpanishSlice'; // Import Spanish words slice
import './WordToLearn.css';

const WordToLearn = () => {
  const dispatch = useDispatch();
  const email = useSelector(selectUser);
  const language = useSelector(selectLanguage);
  const words = useSelector((state) =>
    language === 'turkish' ? selectUnlearnedWords(state, email) :
    language === 'english' ? selectUnlearnedWordsEnglish(state, email) :
    selectUnlearnedWordsSpanish(state, email) // Add Spanish words selection
  );
  const status = useSelector((state) =>
    language === 'turkish' ? state.words.status :
    language === 'english' ? state.wordsEnglish.status :
    state.wordsSpanish.status // Add Spanish status
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

  const handleLearnedClick = (wordId) => {
    if (language === 'turkish') {
      dispatch(markWordAsLearned({ email, wordId }));
    } else if (language === 'english') {
      dispatch(markWordAsLearnedEnglish({ email, wordId }));
    } else if (language === 'spanish') {
      dispatch(markWordAsLearnedSpanish({ email, wordId }));
    }
  };

  return (
    <div className="words-to-learn-container">
      <h1>Words to Learn</h1>
      <p className="total-words">Total words to learn: {words.length}</p>
      {status === 'loading' && <p className="loading">Loading...</p>}
      {status === 'failed' && <p className="error">Failed to load words.</p>}
      {status === 'success' && (
        <>
          {words.length === 0 ? (
            <p className="no-words">No words to learn</p>
          ) : (
            <ul>
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
                  <button onClick={() => handleLearnedClick(word.id)}>I know this</button>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default WordToLearn;

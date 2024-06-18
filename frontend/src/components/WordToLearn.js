// src/components/WordToLearn.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { selectLanguage } from '../features/languageSlice';
import { fetchWords, markWordAsLearned, selectUnlearnedWords } from '../features/wordsSlice';
import { fetchWordsEnglish, markWordAsLearnedEnglish, selectUnlearnedWordsEnglish } from '../features/wordsEnglishSlice';
import './WordToLearn.css';

const WordToLearn = () => {
  const dispatch = useDispatch();
  const email = useSelector(selectUser);
  const language = useSelector(selectLanguage);
  const words = useSelector((state) =>
    language === 'turkish' ? selectUnlearnedWords(state, email) : selectUnlearnedWordsEnglish(state, email)
  );
  const status = useSelector((state) => state.words.status);

  useEffect(() => {
    if (language === 'turkish') {
      dispatch(fetchWords());
    } else {
      dispatch(fetchWordsEnglish());
    }
  }, [dispatch, language]);

  const handleLearnedClick = (wordId) => {
    if (language === 'turkish') {
      dispatch(markWordAsLearned({ email, wordId }));
    } else {
      dispatch(markWordAsLearnedEnglish({ email, wordId }));
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

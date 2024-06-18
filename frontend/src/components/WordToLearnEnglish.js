// src/components/WordToLearnEnglish.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWordsEnglish, markWordAsLearnedEnglish, selectUnlearnedWordsEnglish } from '../features/wordsEnglishSlice';
import { selectUser } from '../features/userSlice';
import './WordToLearn.css';

const WordToLearnEnglish = () => {
  const dispatch = useDispatch();
  const email = useSelector(selectUser);
  const words = useSelector((state) => selectUnlearnedWordsEnglish(state, email));
  const status = useSelector((state) => state.wordsEnglish.status);

  useEffect(() => {
    dispatch(fetchWordsEnglish());
  }, [dispatch]);

  const handleLearnedClick = (wordId) => {
    dispatch(markWordAsLearnedEnglish({ email, wordId }));
  };

  return (
    <div className="words-to-learn-container">
      <h1>Words to Learn (Dutch-English)</h1>
      <p className="total-words">Total words to learn: {words.length}</p> {/* Display total words count */}
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

export default WordToLearnEnglish;

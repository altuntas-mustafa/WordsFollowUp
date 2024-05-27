// src/components/WordToLearn.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWords, markWordAsLearned, selectUnlearnedWords } from '../features/wordsSlice';
import { selectUser } from '../features/userSlice';
import './WordToLearn.css';

const WordToLearn = () => {
  const dispatch = useDispatch();
  const email = useSelector(selectUser);
  const words = useSelector((state) => selectUnlearnedWords(state, email));
  const status = useSelector((state) => state.words.status);

  useEffect(() => {
    dispatch(fetchWords());
  }, [dispatch]);

  const handleLearnedClick = (wordId) => {
    dispatch(markWordAsLearned({ email, wordId }));
  };

  return (
    <div className="words-to-learn-container">
      <h1>Words to Learn</h1>
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
                    <span className="dutch">{word.Voorbeeldzin_Nederlands}</span>
                  </div>
                  <div className="word-section">
                    <span className="label">Example sentence (Turkish):</span>
                    <span className="turkish">{word.OrnekCumleTurkce}</span>
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

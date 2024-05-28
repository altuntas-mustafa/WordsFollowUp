// src/components/YourWordList.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { fetchWords, markWordAsUnknown, selectLearnedWords } from '../features/wordsSlice';
import './YourWordList.css';

const YourWordList = () => {
  const dispatch = useDispatch();
  const email = useSelector(selectUser);
  const learnedWords = useSelector((state) => selectLearnedWords(state, email));
  const status = useSelector((state) => state.words.status);

  useEffect(() => {
    dispatch(fetchWords());
  }, [dispatch]);

  const handleUnknownClick = (wordId) => {
    dispatch(markWordAsUnknown({ email, wordId }));
  };

  return (
    <div className="your-word-list-container">
      <h1>Your Word List</h1>
      <p className="total-words">Total words learned: {learnedWords.length}</p> {/* Display total words count */}
      {status === 'loading' && <p className="loading">Loading...</p>}
      {status === 'failed' && <p className="error">Failed to load words.</p>}
      {learnedWords.length === 0 ? (
        <p className="no-words">No words learned yet</p>
      ) : (
        <ul>
          {learnedWords.map((word) => (
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
              <button onClick={() => handleUnknownClick(word.id)}>Don't Know</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default YourWordList;

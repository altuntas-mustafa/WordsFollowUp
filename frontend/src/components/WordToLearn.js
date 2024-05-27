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
                <li key={word.id}>
                  {word.Nederlands} - {word.Turks}
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

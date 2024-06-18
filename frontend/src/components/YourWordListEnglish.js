// src/components/YourWordListEnglish.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { selectUser } from '../features/userSlice';
import { markWordAsUnknownEnglish } from '../features/wordsEnglishSlice';
import './YourWordList.css';

const YourWordListEnglish = () => {
  const dispatch = useDispatch();
  const email = useSelector(selectUser);
  const [learnedWords, setLearnedWords] = useState([]);

  useEffect(() => {
    if (email) {
      const fetchLearnedWords = async () => {
        const q = query(collection(db, 'words-english'), where('learnedBy', 'array-contains', email));
        const querySnapshot = await getDocs(q);
        const words = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setLearnedWords(words);
      };
      fetchLearnedWords();
    }
  }, [email]);

  const handleUnknownClick = (wordId) => {
    dispatch(markWordAsUnknownEnglish({ wordId }));
    setLearnedWords(learnedWords.filter(word => word.id !== wordId));
  };

  return (
    <div className="your-word-list-container">
      <h1>Your Word List (Dutch-English)</h1>
      <p className="total-words">Total words learned: {learnedWords.length}</p> {/* Display total learned words count */}
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
              <button onClick={() => handleUnknownClick(word.id)}>Don't Know</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default YourWordListEnglish;

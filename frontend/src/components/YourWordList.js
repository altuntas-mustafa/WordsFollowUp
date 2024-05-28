// src/components/YourWordList.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { selectUser } from '../features/userSlice';
import { markWordAsUnknown } from '../features/wordsSlice';
import './YourWordList.css';

const YourWordList = () => {
  const dispatch = useDispatch();
  const email = useSelector(selectUser);
  const [learnedWords, setLearnedWords] = useState([]);
  const [totalWords, setTotalWords] = useState(0);

  useEffect(() => {
    if (email) {
      const fetchLearnedWords = async () => {
        const q = query(collection(db, 'words'), where('learnedBy', '==', email));
        const querySnapshot = await getDocs(q);
        const words = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setLearnedWords(words);
        setTotalWords(words.length); // Update total words count
      };
      fetchLearnedWords();
    }
  }, [email]);

  const handleUnknownClick = (wordId) => {
    dispatch(markWordAsUnknown({ wordId }));
    setLearnedWords(learnedWords.filter(word => word.id !== wordId));
    setTotalWords(totalWords - 1); // Update total words count
  };

  return (
    <div className="your-word-list-container">
      <h1>Your Word List</h1>
      <p className="total-words">Total words learned: {totalWords}</p> {/* Display total words count */}
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

// src/components/YourWordList.js
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { selectUser } from '../features/userSlice';
import './YourWordList.css';

const YourWordList = () => {
  const email = useSelector(selectUser);
  const [learnedWords, setLearnedWords] = useState([]);

  useEffect(() => {
    if (email) {
      const fetchLearnedWords = async () => {
        const q = query(collection(db, 'words'), where('learnedBy', '==', email));
        const querySnapshot = await getDocs(q);
        const words = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setLearnedWords(words);
      };
      fetchLearnedWords();
    }
  }, [email]);

  return (
    <div className="your-word-list-container">
      <h1>Your Word List</h1>
      {learnedWords.length === 0 ? (
        <p className="no-words">No words learned yet</p>
      ) : (
        <ul>
          {learnedWords.map((word) => (
            <li key={word.id}>
              {word.Nederlands} - {word.Turks}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default YourWordList;

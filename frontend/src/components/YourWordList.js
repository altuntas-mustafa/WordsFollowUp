// src/components/YourWordList.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { selectUser } from '../features/userSlice';
import { selectLanguage } from '../features/languageSlice';
import { markWordAsUnknown } from '../features/wordsSlice';
import { markWordAsUnknownEnglish } from '../features/wordsEnglishSlice';
import './YourWordList.css';

const YourWordList = () => {
  const dispatch = useDispatch();
  const email = useSelector(selectUser);
  const language = useSelector(selectLanguage);
  const [learnedWords, setLearnedWords] = useState([]);

  useEffect(() => {
    if (email) {
      const fetchLearnedWords = async () => {
        const collectionName = language === 'turkish' ? 'words' : 'words-english';
        const q = query(collection(db, collectionName), where('learnedBy', 'array-contains', email));
        const querySnapshot = await getDocs(q);
        const words = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setLearnedWords(words);
      };
      fetchLearnedWords();
    }
  }, [email, language]);

  const handleUnknownClick = (wordId) => {
    if (language === 'turkish') {
      dispatch(markWordAsUnknown({ email, wordId }));
    } else {
      dispatch(markWordAsUnknownEnglish({ email, wordId }));
    }
    setLearnedWords(learnedWords.filter(word => word.id !== wordId));
  };

  return (
    <div className="your-word-list-container">
      <h1>Your Word List</h1>
      <p className="total-words">Total learned words: {learnedWords.length}</p>
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
              <button onClick={() => handleUnknownClick(word.id)}>I don't know this</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default YourWordList;

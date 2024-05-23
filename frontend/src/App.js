import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { auth } from './firebase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { firestore } from './firebase';
import Navbar from './components/Navbar';
import LearnWords from './components/LearnWords';
import KnownWords from './components/KnownWords';
import Login from './components/Login';

function App() {
  const [user, setUser] = useState(null);
  const [words, setWords] = useState([]);
  const [knownWords, setKnownWords] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        const wordsRef = collection(firestore, 'words');
        const wordsSnapshot = await getDocs(wordsRef);
        const wordsList = wordsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setWords(wordsList.filter(word => !word.known));
        setKnownWords(wordsList.filter(word => word.known));
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleKnownClick = async (word) => {
    const wordDoc = doc(firestore, 'words', word.id);
    await updateDoc(wordDoc, { known: true });
    setKnownWords([...knownWords, word]);
    setWords(words.filter(w => w.id !== word.id));
  };

  if (!user) {
    return <Login />;
  }

  return (
    <Router>
      <Navbar user={user} />
      <Routes>
        <Route path="/learn" element={<LearnWords words={words} handleKnownClick={handleKnownClick} />} />
        <Route path="/known" element={<KnownWords words={knownWords} />} />
        <Route path="*" element={<Navigate to="/learn" />} />
      </Routes>
    </Router>
  );
}

export default App;

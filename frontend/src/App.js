import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Home from './components/Home';
import YourWordList from './components/YourWordList';
import WordToLearn from './components/WordToLearn';
import Spreken from './components/Spreken';
import SprekenKnown from './components/SprekenKnown';
import Flashcards from './components/Flashcards';
import { setUser, selectUser } from './features/userSlice';
import DutchGrammar from './components/DutchGrammar';
import GrammarDetail from './components/GrammarDetail';

function App() {
  const dispatch = useDispatch();
  const userEmail = useSelector(selectUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user.email));
      } else {
        dispatch(setUser(null));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (!userEmail) {
    return <Login />;
  }

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/your-word-list" element={<YourWordList />} />
        <Route path="/word-to-learn" element={<WordToLearn />} />
        <Route path="/spreken" element={<Spreken />} />
        <Route path="/spreken-known" element={<SprekenKnown />} />
        <Route path="/flashcards" element={<Flashcards />} />
        <Route path="/grammar" element={<DutchGrammar />} />
        <Route path="/grammar/:id" element={<GrammarDetail />} />

      </Routes>
    </Router>
  );
}

export default App;

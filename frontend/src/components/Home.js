// src/components/Home.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signOutUser } from '../firebase';
import { clearUser, selectUser } from '../features/userSlice';

const Home = () => {
  const dispatch = useDispatch();
  const email = useSelector(selectUser);

  const handleSignOut = () => {
    signOutUser();
    dispatch(clearUser());
  };

  return (
    <div className="home-container">
      <h1>Welcome, {email}</h1>
      <p>Select "Words to Learn" to start learning new words, or "Your Word List" to see the words you have learned.</p>
    </div>
  );
};

export default Home;

// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../src/features/userSlice';
import wordsReducer from '../src/features/wordsSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    words: wordsReducer,
  },
});

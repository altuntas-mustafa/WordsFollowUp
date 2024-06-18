// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import wordsReducer from './features/wordsSlice';
import wordsEnglishReducer from './features/wordsEnglishSlice';
import languageReducer from './features/languageSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    words: wordsReducer,
    wordsEnglish: wordsEnglishReducer,
    language: languageReducer,
  },
});

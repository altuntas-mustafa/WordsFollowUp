// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import wordsReducer from './features/wordsSlice';
import wordsEnglishReducer from './features/wordsEnglishSlice';
import wordsSpanishReducer from './features/wordsSpanishSlice'; // Import Spanish words slice
import languageReducer from './features/languageSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    words: wordsReducer,
    wordsEnglish: wordsEnglishReducer,
    wordsSpanish: wordsSpanishReducer, // Add Spanish words slice
    language: languageReducer,
  },
});

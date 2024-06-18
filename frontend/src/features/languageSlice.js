// src/features/languageSlice.js
import { createSlice } from '@reduxjs/toolkit';

const languageSlice = createSlice({
  name: 'language',
  initialState: 'turkish', // default to Turkish
  reducers: {
    setLanguage: (state, action) => action.payload,
  },
});

export const { setLanguage } = languageSlice.actions;
export const selectLanguage = (state) => state.language;

export default languageSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = localStorage.getItem('language') || 'turkish';

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      localStorage.setItem('language', action.payload);
      return action.payload;
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export const selectLanguage = (state) => state.language;

export default languageSlice.reducer;

// src/features/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.email = action.payload;
    },
    clearUser: (state) => {
      state.email = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export const selectUser = (state) => state.user.email;

export default userSlice.reducer;

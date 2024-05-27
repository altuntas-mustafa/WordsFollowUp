// src/features/wordsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../firebase';
import { collection, getDocs, updateDoc, doc, where, query } from 'firebase/firestore';

export const fetchWords = createAsyncThunk('words/fetchWords', async () => {
  const querySnapshot = await getDocs(collection(db, 'words'));
  const words = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return words;
});

export const markWordAsLearned = createAsyncThunk('words/markWordAsLearned', async ({ email, wordId }) => {
  const wordRef = doc(db, 'words', wordId);
  await updateDoc(wordRef, { learnedBy: email });
  return { wordId, email };
});

export const markWordAsUnknown = createAsyncThunk('words/markWordAsUnknown', async ({ wordId }) => {
  const wordRef = doc(db, 'words', wordId);
  await updateDoc(wordRef, { learnedBy: '' });
  return wordId;
});

const wordsSlice = createSlice({
  name: 'words',
  initialState: {
    words: [],
    status: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWords.fulfilled, (state, action) => {
        state.words = action.payload;
        state.status = 'success';
      })
      .addCase(fetchWords.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWords.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(markWordAsLearned.fulfilled, (state, action) => {
        const { wordId, email } = action.payload;
        const word = state.words.find(word => word.id === wordId);
        if (word) {
          word.learnedBy = email;
        }
      })
      .addCase(markWordAsUnknown.fulfilled, (state, action) => {
        const wordId = action.payload;
        const word = state.words.find(word => word.id === wordId);
        if (word) {
          word.learnedBy = '';
        }
      });
  },
});

export const selectWords = (state) => state.words.words;
export const selectUnlearnedWords = (state, email) =>
  state.words.words.filter(word => !word.learnedBy || word.learnedBy !== email);
export const selectLearnedWords = (state, email) =>
  state.words.words.filter(word => word.learnedBy === email);

export default wordsSlice.reducer;

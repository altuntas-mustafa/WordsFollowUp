// src/features/wordsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../firebase';
import { collection, getDocs, updateDoc, doc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { createSelector } from 'reselect';

export const fetchWords = createAsyncThunk('words/fetchWords', async () => {
  const querySnapshot = await getDocs(collection(db, 'words'));
  const words = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return words;
});

export const markWordAsLearned = createAsyncThunk('words/markWordAsLearned', async ({ email, wordId }) => {
  const wordRef = doc(db, 'words', wordId);
  await updateDoc(wordRef, { learnedBy: arrayUnion(email) });
  return { wordId, email };
});

export const markWordAsUnknown = createAsyncThunk('words/markWordAsUnknown', async ({ email, wordId }) => {
  const wordRef = doc(db, 'words', wordId);
  await updateDoc(wordRef, { learnedBy: arrayRemove(email) });
  return { wordId, email };
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
          if (!word.learnedBy) {
            word.learnedBy = [email];
          } else if (!word.learnedBy.includes(email)) {
            word.learnedBy.push(email);
          }
        }
      })
      .addCase(markWordAsUnknown.fulfilled, (state, action) => {
        const { wordId, email } = action.payload;
        const word = state.words.find(word => word.id === wordId);
        if (word && word.learnedBy) {
          word.learnedBy = word.learnedBy.filter(e => e !== email);
        }
      });
  },
});

export const selectWords = (state) => state.words.words;
export const selectUnlearnedWords = createSelector(
  [selectWords, (state, email) => email],
  (words, email) => words.filter(word => !word.learnedBy || !word.learnedBy.includes(email))
);
export const selectLearnedWords = createSelector(
  [selectWords, (state, email) => email],
  (words, email) => words.filter(word => word.learnedBy && word.learnedBy.includes(email))
);

export default wordsSlice.reducer;

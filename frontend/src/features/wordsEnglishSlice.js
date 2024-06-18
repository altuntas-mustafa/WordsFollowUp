// src/features/wordsEnglishSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../firebase';
import { collection, getDocs, updateDoc, doc, arrayUnion } from 'firebase/firestore';

export const fetchWordsEnglish = createAsyncThunk('wordsEnglish/fetchWords', async () => {
  const querySnapshot = await getDocs(collection(db, 'words-english'));
  const words = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return words;
});

export const markWordAsLearnedEnglish = createAsyncThunk('wordsEnglish/markWordAsLearned', async ({ email, wordId }) => {
  const wordRef = doc(db, 'words-english', wordId);
  await updateDoc(wordRef, { learnedBy: arrayUnion(email) });
  return { wordId, email };
});

export const markWordAsUnknownEnglish = createAsyncThunk('wordsEnglish/markWordAsUnknown', async ({ wordId }) => {
  const wordRef = doc(db, 'words-english', wordId);
  await updateDoc(wordRef, { learnedBy: '' });
  return wordId;
});

const wordsEnglishSlice = createSlice({
  name: 'wordsEnglish',
  initialState: {
    words: [],
    status: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWordsEnglish.fulfilled, (state, action) => {
        state.words = action.payload;
        state.status = 'success';
      })
      .addCase(fetchWordsEnglish.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWordsEnglish.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(markWordAsLearnedEnglish.fulfilled, (state, action) => {
        const { wordId, email } = action.payload;
        const word = state.words.find(word => word.id === wordId);
        if (word) {
          word.learnedBy.push(email);
        }
      })
      .addCase(markWordAsUnknownEnglish.fulfilled, (state, action) => {
        const wordId = action.payload;
        const word = state.words.find(word => word.id === wordId);
        if (word) {
          word.learnedBy = [];
        }
      });
  },
});

export const selectWordsEnglish = (state) => state.wordsEnglish.words;
export const selectUnlearnedWordsEnglish = (state, email) =>
  state.wordsEnglish.words.filter(word => !word.learnedBy.includes(email));
export const selectLearnedWordsEnglish = (state, email) =>
  state.wordsEnglish.words.filter(word => word.learnedBy.includes(email));

export default wordsEnglishSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../firebase';
import { collection, getDocs, updateDoc, doc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { createSelector } from 'reselect';

// Async thunks
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

export const markWordAsUnknownEnglish = createAsyncThunk('wordsEnglish/markWordAsUnknown', async ({ email, wordId }) => {
  const wordRef = doc(db, 'words-english', wordId);
  await updateDoc(wordRef, { learnedBy: arrayRemove(email) });
  return { wordId, email };
});

// Slice
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
        const { wordId, email } = action.payload;
        const word = state.words.find(word => word.id === wordId);
        if (word) {
          word.learnedBy = word.learnedBy.filter(e => e !== email);
        }
      });
  },
});

// Selectors
export const selectWordsEnglish = (state) => state.wordsEnglish.words;
export const selectUnlearnedWordsEnglish = createSelector(
  [selectWordsEnglish, (state, email) => email],
  (words, email) => words.filter(word => !word.learnedBy.includes(email))
);

// Exports
export default wordsEnglishSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../firebase';
import { collection, getDocs, updateDoc, doc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { createSelector } from 'reselect';

export const fetchWordsSpanish = createAsyncThunk('wordsSpanish/fetchWords', async () => {
  const querySnapshot = await getDocs(collection(db, 'words-spanish'));
  const words = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return words;
});

export const markWordAsLearnedSpanish = createAsyncThunk('wordsSpanish/markWordAsLearned', async ({ email, wordId }) => {
  const wordRef = doc(db, 'words-spanish', wordId);
  await updateDoc(wordRef, { learnedBy: arrayUnion(email) });
  return { wordId, email };
});

export const markWordAsUnknownSpanish = createAsyncThunk('wordsSpanish/markWordAsUnknown', async ({ email, wordId }) => {
  const wordRef = doc(db, 'words-spanish', wordId);
  await updateDoc(wordRef, { learnedBy: arrayRemove(email) });
  return { wordId, email };
});

const wordsSpanishSlice = createSlice({
  name: 'wordsSpanish',
  initialState: {
    words: [],
    status: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWordsSpanish.fulfilled, (state, action) => {
        state.words = action.payload;
        state.status = 'success';
      })
      .addCase(fetchWordsSpanish.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWordsSpanish.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(markWordAsLearnedSpanish.fulfilled, (state, action) => {
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
      .addCase(markWordAsUnknownSpanish.fulfilled, (state, action) => {
        const { wordId, email } = action.payload;
        const word = state.words.find(word => word.id === wordId);
        if (word && word.learnedBy) {
          word.learnedBy = word.learnedBy.filter(e => e !== email);
        }
      });
  },
});

export const selectWordsSpanish = (state) => state.wordsSpanish.words;
export const selectUnlearnedWordsSpanish = createSelector(
  [selectWordsSpanish, (state, email) => email],
  (words, email) => words.filter(word => !word.learnedBy || !word.learnedBy.includes(email))
);

export default wordsSpanishSlice.reducer;

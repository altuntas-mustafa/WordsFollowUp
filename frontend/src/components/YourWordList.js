import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { selectUser } from "../features/userSlice";
import { selectLanguage } from "../features/languageSlice";
import { markWordAsUnknown } from "../features/wordsSlice";
import { markWordAsUnknownEnglish } from "../features/wordsEnglishSlice";
import { markWordAsUnknownSpanish } from "../features/wordsSpanishSlice";
import "./YourWordList.css";

const YourWordList = () => {
  const email = useSelector(selectUser);
  const language = useSelector(selectLanguage);
  const dispatch = useDispatch();
  const [learnedWords, setLearnedWords] = useState([]);

  useEffect(() => {
    if (email) {
      const fetchLearnedWords = async () => {
        const collectionName =
          language === "turkish"
            ? "words"
            : language === "english"
            ? "words-english"
            : "words-spanish";
        const q = query(
          collection(db, collectionName),
          where("learnedBy", "array-contains", email)
        );
        const querySnapshot = await getDocs(q);
        const words = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLearnedWords(words);
      };
      fetchLearnedWords();
    }
  }, [email, language]);

  const handleDontKnowClick = (wordId) => {
    if (language === "turkish") {
      dispatch(markWordAsUnknown({ email, wordId }));
    } else if (language === "english") {
      dispatch(markWordAsUnknownEnglish({ email, wordId }));
    } else if (language === "spanish") {
      dispatch(markWordAsUnknownSpanish({ email, wordId }));
    }

    // Remove the word from the local state
    setLearnedWords(learnedWords.filter((word) => word.id !== wordId));
  };

  return (
    <div className="your-word-list-container">
      <h1>Your Word List</h1>
      <p className="total-words">Total learned words: {learnedWords.length}</p>
      {learnedWords.length === 0 ? (
        <p className="no-words">No words learned yet</p>
      ) : (
        <ul>
          {learnedWords.map((word) => (
            <li key={word.id} className="word-item">
              <div className="word-section">
                <span className="label">Dutch:</span>
                <span className="dutch">{word.Nederlands}</span>
              </div>
              <div className="word-section">
                <span className="label">
                  {language === "turkish"
                    ? "Turkish"
                    : language === "english"
                    ? "English"
                    : "Spanish"}
                  :
                </span>
                <span
                  className={
                    language === "turkish"
                      ? "turkish"
                      : language === "english"
                      ? "english"
                      : "spanish"
                  }
                >
                  {language === "turkish"
                    ? word.Turks
                    : language === "english"
                    ? word.Engels
                    : word.Spanish}
                </span>
              </div>
              <div className="word-section">
                <span className="label">Hoe te lezen:</span>
                <span className="dutch">{word.HoeTeLezen}</span>
              </div>
              <div className="word-section">
                {language === "spanish" ? (
                  <>
                    <span className="label">Cómo leer:</span>
                    <span className="spanish">{word.Cómo_leer}</span>
                  </>
                ) : (
                  <>
                    <span className="label">Hoe te lezen:</span>
                    <span className="dutch">{word.HoeTeLezen}</span>
                  </>
                )}
              </div>

              <div className="word-section">
                <span className="label">Example sentence (Dutch):</span>
                <span className="dutch">{word.Voorbeeldzin_Nederlands}</span>
              </div>
              <div className="word-section">
                <span className="label">
                  Example sentence (
                  {language === "turkish"
                    ? "Turkish"
                    : language === "english"
                    ? "English"
                    : "Spanish"}
                  ):
                </span>
                <span
                  className={
                    language === "turkish"
                      ? "turkish"
                      : language === "english"
                      ? "english"
                      : "spanish"
                  }
                >
                  {language === "turkish"
                    ? word.OrnekCumleTurkce
                    : language === "english"
                    ? word.ExampleSentenceEnglish
                    : word.Ejemplo_de_oración_Español}
                </span>
              </div>
              <button
                onClick={() => handleDontKnowClick(word.id)}
                className="dont-know-button"
              >
                I don't know this
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default YourWordList;

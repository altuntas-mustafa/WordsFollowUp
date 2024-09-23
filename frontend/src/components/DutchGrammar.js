import { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';  // New Firestore imports
import './DutchGrammar.css';

const db = getFirestore();  // Initialize Firestore

const DutchGrammar = () => {
  const [grammarTopics, setGrammarTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchGrammarTopics = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'grammar'));  // Updated call
      const topics = querySnapshot.docs.map((doc, index) => ({
        id: index + 1,
        ...doc.data(),
      }));
      setGrammarTopics(topics);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching grammar topics:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGrammarTopics();
  }, []);

  return (
    <div className="dutch-grammar">
      <h1>Dutch Grammar Topics</h1>
      {loading ? (
        <p>Loading grammar topics...</p>
      ) : (
        <ul>
          {grammarTopics.map((topic) => (
            <li key={topic.id}>
              <a href={`/grammar/${topic.id}`}>{topic.title}</a>  {/* Link to detailed grammar page */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DutchGrammar;

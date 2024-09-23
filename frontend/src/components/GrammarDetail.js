import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import './GrammarDetail.css';

const db = getFirestore();

const GrammarDetail = () => {
  const { id } = useParams();
  const [topicDetails, setTopicDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopicDetails = async () => {
      try {
        const docRef = doc(db, 'grammar', `topic${id}`);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setTopicDetails(docSnap.data());
        } else {
          console.error("No such document!");
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching grammar topic:', error);
        setLoading(false);
      }
    };

    fetchTopicDetails();
  }, [id]);

  if (loading) {
    return <div>Loading grammar details...</div>;
  }

  if (!topicDetails) {
    return <div>No topic found.</div>;
  }

  return (
    <div className="grammar-detail">
      <h1>{topicDetails.title}</h1>
      {topicDetails.description.map((section, index) => (
        <div key={index} className="grammar-section">
          <h2>{section.sectionTitle}</h2>
          <ul>
            {section.content.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
      
      {/* Check if there is an external link and display it */}
      {topicDetails.externalLink && (
        <div className="external-link">
          <a href={topicDetails.externalLink.url} target="_blank" rel="noopener noreferrer">
            {topicDetails.externalLink.text}
          </a>
        </div>
      )}
    </div>
  );
};

export default GrammarDetail;

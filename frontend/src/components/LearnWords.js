// src/pages/LearnWords.js
import React from 'react';

function LearnWords({ words, handleKnownClick }) {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Words to Learn</h2>
      <ul>
        {words.map(word => (
          <li key={word.id} style={{ marginBottom: '10px' }}>
            {word.dutch} - {word.english}
            <button onClick={() => handleKnownClick(word)} style={{ marginLeft: '10px' }}>I know this</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LearnWords;

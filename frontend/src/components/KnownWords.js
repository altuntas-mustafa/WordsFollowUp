// src/pages/KnownWords.js
import React from 'react';

function KnownWords({ words }) {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Known Words</h2>
      <ul>
        {words.map(word => (
          <li key={word.id} style={{ marginBottom: '10px' }}>
            {word.dutch} - {word.english}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default KnownWords;

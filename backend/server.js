const express = require('express');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');
const pdf = require('pdf-parse');
const fs = require('fs');
const cors = require('cors');

const serviceAccount = require('./wordlearningapp-b4360-firebase-adminsdk-tvj6y-82e3ae1618.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Read PDF and parse words
const pdfPath = './e-book-lesson-1-20-1000DutchWords.pdf';

async function parseAndSaveWords() {
  const dataBuffer = fs.readFileSync(pdfPath);
  const data = await pdf(dataBuffer);
  const words = extractWords(data.text);
  await saveWordsToFirestore(words);
}

function extractWords(text) {
  const lines = text.split('\n');
  const words = [];
  let lesson = '';

  lines.forEach(line => {
    if (line.startsWith('LESSON')) {
      lesson = line;
    } else {
      const parts = line.split(' ');
      if (parts.length > 1) {
        const dutch = parts[0];
        const english = parts.slice(1).join(' ');
        words.push({ dutch, english, lesson });
      }
    }
  });

  return words;
}

async function saveWordsToFirestore(words) {
  const batch = db.batch();
  words.forEach((word, index) => {
    const docRef = db.collection('words').doc(`word${index + 1}`);
    batch.set(docRef, word);
  });
  await batch.commit();
  console.log('Words have been saved to Firestore');
}

app.get('/api/words', async (req, res) => {
  try {
    const wordsSnapshot = await db.collection('words').get();
    const words = wordsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(words);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post('/api/words/known', async (req, res) => {
  const { id } = req.body;
  try {
    await db.collection('words').doc(id).update({ known: true });
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  parseAndSaveWords();
});

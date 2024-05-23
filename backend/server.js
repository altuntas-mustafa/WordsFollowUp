const express = require('express');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');
const pdf = require('pdf-parse');
const fs = require('fs');
const cors = require('cors');
require('dotenv').config();

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());



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
});

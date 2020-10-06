const express = require('express');
const admin = require('firebase-admin');
const app = express();
const port = process.env.PORT || 3000;
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

app.get('/posts', (request, response) => {
  response.set('Access-Control-Allow-Origin', '*');
  let posts = [];
  db.collection('posts')
    .orderBy('date', 'desc')
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        // console.log(`${doc.id} => ${doc.data()}`);
        posts.push(doc.data());
      });
      response.send(posts);
    });
});

app.post('/createPost', (request, response) => {
  response.set('Access-Control-Allow-Origin', '*');
});

app.listen(port, () => {
  console.log('Server started.');
});

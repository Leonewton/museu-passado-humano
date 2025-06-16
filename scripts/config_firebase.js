const firebaseConfig = {
  apiKey: "AIzaSyA5YIKxAiDdh6sN77MoBjsdL9fraIZkCMs",
  authDomain: "noticias-museu-d198e.firebaseapp.com",
  databaseURL: "https://noticias-museu-d198e-default-rtdb.firebaseio.com",
  projectId: "noticias-museu-d198e",
  storageBucket: "noticias-museu-d198e.firebasestorage.app",
  messagingSenderId: "18871166436",
  appId: "1:18871166436:web:ae3bbd3106e0714fa413f1",
};

firebase.initializeApp(firebaseConfig);

const banco = firebase.database();

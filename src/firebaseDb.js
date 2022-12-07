import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB7yK9g6LSXcEntRuc78ba3djcPfbxx-3g",
  authDomain: "fir-db354.firebaseapp.com",
  projectId: "fir-db354",
  storageBucket: "fir-db354.appspot.com",
  messagingSenderId: "620513931374",
  appId: "1:620513931374:web:e57fb86b5352c2fc19367f",
  measurementId: "G-WX4PFX6XMW"
};


const firebaseApp = firebase.initializeApp(firebaseConfig)

export const db = firebaseApp.firestore();
import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAFM0YRhfWTWcaOIW2PP6K9h6MyppC8DX8",
    authDomain: "reactnative-chat-fcf5b.firebaseapp.com",
    projectId: "reactnative-chat-fcf5b",
    storageBucket: "reactnative-chat-fcf5b.appspot.com",
    messagingSenderId: "567025738560",
    appId: "1:567025738560:web:16c00692c266fbe88fd0a5"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();
  const db = firebase.firestore();

  export { auth, db }
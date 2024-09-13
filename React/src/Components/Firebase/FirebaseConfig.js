import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/storage';  // Import Firebase Storage

const firebaseConfig = {
  apiKey: "AIzaSyCr67hjaYZtUp4K32J8Ga4x6fcMFDZb6Z4",
  authDomain: "quiz-app-f21c8.firebaseapp.com",
  databaseURL: "https://quiz-app-f21c8-default-rtdb.firebaseio.com",
  projectId: "quiz-app-f21c8",
  storageBucket: "quiz-app-f21c8.appspot.com",
  messagingSenderId: "717819943537",
  appId: "1:717819943537:web:143434ed850a72dc5ed9d0"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();  

export { db, auth, storage };

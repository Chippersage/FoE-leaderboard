import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/storage';  // Import Firebase Storage

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDya3I7NYFt68tGXiLCCBRseOeFTkTTWB4",
  authDomain: "quizapp-8bce7.firebaseapp.com",
  projectId: "quizapp-8bce7",
  storageBucket: "quizapp-8bce7.appspot.com",
  messagingSenderId: "360804251137",
  appId: "1:360804251137:web:ff970862d35b24906cf200"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();  

export { db, auth, storage };

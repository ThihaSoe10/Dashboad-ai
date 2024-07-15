// // src/firebase.js
// import firebase from 'firebase/app';
// import { getAnalytics } from "firebase/analytics";
// import 'firebase/database'; //'firebase/firestore' or 'firebase/database' if using Realtime Database

// const firebaseConfig = {
//     apiKey: "AIzaSyBb0STZdIj74Esu1kuuoDWlBsvCy-z1Bk4",
//     authDomain: "bitbrawl-404.firebaseapp.com",
//     databaseURL: "https://bitbrawl-404-default-rtdb.asia-southeast1.firebasedatabase.app",
//     projectId: "bitbrawl-404",
//     storageBucket: "bitbrawl-404.appspot.com",
//     messagingSenderId: "403464469352",
//     appId: "1:403464469352:web:ad6b3e3f44ab2da96374dd",
//     measurementId: "G-PTE8NYVB75"
//   };

// // Initialize Firebase
// const firebaseApp = firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// // Initialize Firestore or Realtime Database
// const db = firebaseApp.database(); //firebaseApp.firestore(); or firebaseApp.database();

// export { db };
import firebase from 'firebase/compat/app'; // Importing from 'firebase/compat/app' for Firebase v9+
import { getAnalytics } from 'firebase/analytics';
import 'firebase/compat/database'; // Importing from 'firebase/compat/database' for Firebase v9+

const firebaseConfig = {
  apiKey: "AIzaSyAei2Enk5qD6cBtosYB66qQwzmUHzrEW1w",
  authDomain: "bitbrawl-official-airdrop.firebaseapp.com",
  databaseURL: "https://bitbrawl-official-airdrop-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "bitbrawl-official-airdrop",
  storageBucket: "bitbrawl-official-airdrop.appspot.com",
  messagingSenderId: "179762649507",
  appId: "1:179762649507:web:fe42f84b205d2c0bca2216",
  measurementId: "G-SVKSDKEN7M"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

// Initialize Firestore or Realtime Database
const db = firebaseApp.database(); // Use firebaseApp.firestore() for Firestore

export { db };


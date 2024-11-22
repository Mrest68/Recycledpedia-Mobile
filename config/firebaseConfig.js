// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
//import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyB6MSfcTn022YhCkszH6zRnjXG9Kqeuy0k",
  authDomain: "diginfo.firebaseapp.com",
  projectId: "diginfo",
  storageBucket: "diginfo.firebasestorage.app",
  messagingSenderId: "886289701437",
  appId: "1:886289701437:web:f4765a6047a28c07366854",
  //measurementId: "G-7397KWBB1K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
//const analytics = getAnalytics(app);

export { firestore };
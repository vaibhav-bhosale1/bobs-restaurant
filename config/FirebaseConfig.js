// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC49xku4ZQQSleeMZTIqAKBswMkXfzoOK0",
  authDomain: "meetnest-d7231.firebaseapp.com",
  projectId: "meetnest-d7231",
  storageBucket: "meetnest-d7231.firebasestorage.app",
  messagingSenderId: "1045766931338",
  appId: "1:1045766931338:web:fb02ccc338f20a6155be73",
  measurementId: "G-B43MCN926C"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWFjPKIB1VvfqjVafBoKbAQKI7PnT5qRg",
  authDomain: "wads-bf16f.firebaseapp.com",
  projectId: "wads-bf16f",
  storageBucket: "wads-bf16f.firebasestorage.app",
  messagingSenderId: "349499130950",
  appId: "1:349499130950:web:93c4d0dd580b5b8169f647",
  measurementId: "G-CJFQSRRFHB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
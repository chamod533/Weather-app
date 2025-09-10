// Import Firebase core
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // 👈 add this

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCQ_qPJQc4qbYFoeCsFO4MlLWxAdAkwLmE",
  authDomain: "weather-app-64e03.firebaseapp.com",
  projectId: "weather-app-64e03",
  storageBucket: "weather-app-64e03.firebasestorage.app",
  messagingSenderId: "529098119465",
  appId: "1:529098119465:web:d0976a7508ebde74d53f38",
  measurementId: "G-08YHWLBR4Q",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore
export const db = getFirestore(app); // 👈 this is what Weather.jsx needs

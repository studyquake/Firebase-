import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";

export const DEFAULT_FIREBASE_CONFIG = {
  apiKey: "AIzaSyBGyJSl9p1bxqm7x63pbe4WJ9lHnNQSA_E",
  authDomain: "studyquake586.firebaseapp.com",
  projectId: "studyquake586",
  storageBucket: "studyquake586.firebasestorage.app",
  messagingSenderId: "170403982802",
  appId: "1:170403982802:web:83b595d30364c294b4ec0b",
  measurementId: "G-52SNKVBJ7L"
};

// Initialize Firebase App
export const app: FirebaseApp = !getApps().length
  ? initializeApp(DEFAULT_FIREBASE_CONFIG)
  : getApp();

export const db: Firestore = getFirestore(app);

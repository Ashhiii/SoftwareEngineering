import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD23aVqgSaaqi8z6CAp7eDQdbpA5CTFqr8",
  authDomain: "ecoguard-51d4a.firebaseapp.com",
  projectId: "ecoguard-51d4a",
  storageBucket: "ecoguard-51d4a.appspot.com",
  messagingSenderId: "991015704585",
  appId: "1:991015704585:web:4567010366c45cf8ce40d8",
  measurementId: "G-KV8X1741J3"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app)

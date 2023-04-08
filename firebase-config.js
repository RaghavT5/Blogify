import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAoHNjXFFvupDkBJz3H0U-qzTVDmXQ4Gmo",
  authDomain: "blogify-nextjs-v2.firebaseapp.com",
  projectId: "blogify-nextjs-v2",
  storageBucket: "blogify-nextjs-v2.appspot.com",
  messagingSenderId: "754905842093",
  appId: "1:754905842093:web:429404415d5f0c2a8e6124",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

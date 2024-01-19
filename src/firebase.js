import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBmLfXiPXmkA-KovIM46PvZoLmPrVJ7KnI",
  authDomain: "mobfocusworld.firebaseapp.com",
  projectId: "mobfocusworld",
  storageBucket: "mobfocusworld.appspot.com",
  messagingSenderId: "43928206809",
  appId: "1:43928206809:web:c5478510b7221167bf6dc8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;

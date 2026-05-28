import { initializeApp }
from "firebase/app";

import { getAuth }
from "firebase/auth";

import { getFirestore }
from "firebase/firestore";

const firebaseConfig = {

  apiKey: "AIzaSyCJtHZqswQlLPpeAKyzIe5JqCxDO1TrkCM",

  authDomain: "study-companion-ai-bff5e.firebaseapp.com",

  projectId: "study-companion-ai-bff5e",

  storageBucket: "study-companion-ai-bff5e.firebasestorage.app",

  messagingSenderId:
    "26147080049",

  appId: "1:26147080049:web:87fb1f3d31b51f6e8318d0"

};
const app =
  initializeApp(firebaseConfig);

export const auth =
  getAuth(app);

  export const db =
  getFirestore(app);
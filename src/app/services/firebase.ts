import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.NEXT_FIREBASE_APIKEY,
    authDomain: process.env.NEXT_AUTH_DOMAIN,
    projectId: process.env.NEXT_PROJECTID,
    storageBucket: process.env.NEXT_STORAGEBUCKET,
    messagingSenderId: process.env.NEXT_MESSAGINGSENDERID,
    appId: process.env.NEXT_APPID,
    measurementId: process.env.NEXT_MEASUREMENTID
  };
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: procces.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: procces.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: procces.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: procces.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: procces.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: procces.env.REACT_APP_FIREBASE_APPID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;

import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  signOut, 
  signInWithPopup 
} from "firebase/auth";
import { getDatabase, ref, set, get, onValue } from "firebase/database";

// Firebase configuration (RTDB only - NO Firestore)
const firebaseConfig = {
  apiKey: "AIzaSyC1042sqv3JnpPmiCuB9aTXgz5A6EnqSVY",
  authDomain: "codeon-hosting.firebaseapp.com",
  databaseURL: "https://codeon-hosting-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "codeon-hosting",
  storageBucket: "codeon-hosting.firebasestorage.app",
  messagingSenderId: "176686327178",
  appId: "1:176686327178:web:b6cc4c768c6b38aa441473",
  measurementId: "G-BHEVCLQ70D"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const database = getDatabase(app);
const googleProvider = new GoogleAuthProvider();

export { 
  auth, 
  database,
  ref,
  set,
  get,
  onValue,
  googleProvider, 
  onAuthStateChanged, 
  signOut, 
  signInWithPopup 
};

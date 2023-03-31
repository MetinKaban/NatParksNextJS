import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC_m_E_Oa6SWqvuvWsvrhg4AFzmOobVLBo",
  authDomain: "nat-parks-5318e.firebaseapp.com",
  projectId: "nat-parks-5318e",
  storageBucket: "nat-parks-5318e.appspot.com",
  messagingSenderId: "819721779165",
  appId: "1:819721779165:web:7dcfd8fbc350ae8a16e834",
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);

const logout = () => {
  signOut(firebaseAuth)
}

export {firebaseApp, firebaseAuth, logout}
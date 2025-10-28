import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyDnEh_tKWovymlC-hZMrL6o74l7m_gMJuo",
  authDomain: "netflix-clone-6d6b0.firebaseapp.com",
  projectId: "netflix-clone-6d6b0",
  storageBucket: "netflix-clone-6d6b0.firebasestorage.app",
  messagingSenderId: "716172218567",
  appId: "1:716172218567:web:a373ae96b9a747367f2ee2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, passowrd) => {
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      passowrd
    );
    const user = response.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);;
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
};

const logout = async () =>{
    signOut(auth);
}

export {auth, db, login, signup, logout};
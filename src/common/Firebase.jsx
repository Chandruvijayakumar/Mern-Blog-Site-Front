// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCb_uuAdY5evztlaFN2EC_Df3WN0EvY19w",
  authDomain: "blog-website-8411c.firebaseapp.com",
  projectId: "blog-website-8411c",
  storageBucket: "blog-website-8411c.appspot.com",
  messagingSenderId: "455908048914",
  appId: "1:455908048914:web:ba6c5902ecb1859ccf58cb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider()

//To create authentication flow

const auth = getAuth();
export const authwithGoogle = async() => {
    let user = null;
    await signInWithPopup(auth, provider)
        .then((result) => {
            user = result.user
        })
        .catch((err)=>{
        console.log(err);
    
        })
    return user;
}

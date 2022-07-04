import { initializeApp } from 'firebase/app';

import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyC9Pd908gW9_-BPKiZDyRsVw1L8DKj7dw0",
    authDomain: "irc-ndt.firebaseapp.com",
    projectId: "irc-ndt",
    storageBucket: "irc-ndt.appspot.com",
    messagingSenderId: "971523865654",
    appId: "1:971523865654:web:cc689f10f2cd8b28dd6c97"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app)

export const storage = getStorage(app)


import { initializeApp } from 'firebase/app';

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, deleteUser } from 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyC9Pd908gW9_-BPKiZDyRsVw1L8DKj7dw0",
    authDomain: "irc-ndt.firebaseapp.com",
    projectId: "irc-ndt",
    storageBucket: "irc-ndt.appspot.com",
    messagingSenderId: "971523865654",
    appId: "1:971523865654:web:cc689f10f2cd8b28dd6c97"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


const handleError = (func) => {
    try {
        return func();
    } catch (error) {
        console.error(error)
    }
}


const createUser = async () => {
    await createUserWithEmailAndPassword(auth, 'ychjaat@gmail.com', 'hh7889ds');
}

const deleteAccount = async() => {
    await signInWithEmailAndPassword(auth,'ychjaat@gmail.com', 'hh7889ds')
    var currenUser = auth.currentUser;
    await deleteUser(currenUser)
}




handleError(deleteAccount);
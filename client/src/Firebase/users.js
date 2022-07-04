import { auth, db } from './config'
import {
    doc,
    setDoc,
    getDoc
} from 'firebase/firestore'


import {
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signInWithEmailAndPassword
} from 'firebase/auth'


export const resetPassword = async ({ email }) => {
    await sendPasswordResetEmail(auth, email);
}

export const userLogin = async ({ email, password }) => {
    await signInWithEmailAndPassword(auth, email, password);
}

export const createPublicUser = async ({ email, password, name, phone, gst, pan }) => {
    const uid = await (await createUserWithEmailAndPassword(auth, email, password)).user.uid;
    const path = doc(db, `users/${uid}`);
    await setDoc(path, {
        uid,
        role: 'public-user',
        email,
        password,
        name,
        phone,
        gst,
        pan
    })
}

//---create user by admin---
export const createUserByAdmin = async ({ email, password, name, userType, phone }) => {
    const uid = await (await createUserWithEmailAndPassword(auth, email, password)).user.uid;
    const path = doc(db, `users/${uid}`);
    await setDoc(path, {
        uid,
        role: userType,
        email,
        password,
        name,
        phone
    })
}


//-----get logged user details from db---
export const getCurrentUserDetails = async () => {
    const uid = auth.currentUser.uid;
    var docRef = doc(db, `users/${uid}`);
    var user = await (await getDoc(docRef)).data();
    return user;
}
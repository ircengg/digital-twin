
import {
    doc,
    setDoc
} from 'firebase/firestore'

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





const uploaData = async () => {

    var path = doc(db, 'settings/tasks');
    await setDoc(path,
        {
            tasks: {
                piInvoice: {
                    name: 'PI (Performa Invoice)',
                    timeInHours: 48,
                    doer: '1hhpnC0kq9V4PDcLXcLPfmyNUb62',
                    dependOn: 'orderDate',
                    required: true
                },
                stampTransfer: {
                    name: 'Stamp transfer for speciman copy',
                    timeInHours: '2 days',
                    doer: 'AKHILESH',
                    dependOn: 'orderDate',
                    required: true
                },
                specimenPrep: {
                    name: 'Speciman Prepration',
                    timeInHours: '1 days',
                    doer: '1hhpnC0kq9V4PDcLXcLPfmyNUb62',
                    dependOn: 'stampTransfer',
                    required: true
                },
                accuracy: {
                    name: 'Checking Accuracy of Speciman',
                    timeInHours: '2 days',
                    doer: 'LALBABU',
                    dependOn: 'specimenPrep',
                    required: true
                },

                report: {
                    name: 'Test Report',
                    timeInHours: '3 days',
                    doer: 'RAM KUMAR',
                    dependOn: 'orderDate',
                    required: true
                },
                reportReview: {
                    name: 'Report Review',
                    timeInHours: '1 days',
                    doer: 'RAM KUMAR',
                    dependOn: 'report',
                    required: true
                },
                invoice: {
                    name: 'Invoice',
                    timeInHours: '1 days',
                    doer: '1hhpnC0kq9V4PDcLXcLPfmyNUb62',
                    dependOn: 'reportReview',
                    required: true
                },
                payment: {
                    name: 'Payment',
                    timeInHours: '1 days',
                    doer: 'Antima',
                    dependOn: 'invoice',
                    required: true
                },


                //testing-----
                tpi: {
                    name: 'Confirming for witness of test',
                    timeInHours: '2 days',
                    doer: 'RAM KUMAR',
                    dependOn: 'accuracy',
                    required: false
                },
                dpt: {
                    name: 'DPT',
                    timeInHours: '2 days',
                    doer: '1hhpnC0kq9V4PDcLXcLPfmyNUb62',
                    dependOn: 'accuracy',
                    required: false
                },

                mpt: {
                    name: 'MPT',
                    timeInHours: '2 days',
                    doer: 'RAM KUMAR',
                    dependOn: 'accuracy',
                    required: false
                },
                ut: {
                    name: 'UT',
                    timeInHours: '2 days',
                    doer: 'RAM KUMAR',
                    dependOn: 'accuracy',
                    required: false
                },
                rt: {
                    name: 'RT',
                    timeInHours: '2 days',
                    doer: '1hhpnC0kq9V4PDcLXcLPfmyNUb62',
                    dependOn: 'accuracy',
                    required: false
                }
            }
        }
    );
}

uploaData()
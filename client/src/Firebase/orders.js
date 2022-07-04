import { db, storage, auth } from './config'
import {
    FieldValue,
    doc,
    collection,
    getDoc,
    getDocs,
    setDoc,
    addDoc,
    query,
    where,
    orderBy,
    updateDoc
} from 'firebase/firestore'

import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'


import { getAllTasks } from './tasks'



export const placeOrder = async ({ uid, email, name, phone, gst, pan, refNo, sampleQty, tests, refDoc }) => {
    console.log('ccc')
    var refDocUrl = 'NA';
    if (refDoc) {
        const metadata = { contentType: refDoc.type }
        const orderDocRef = storageRef(storage, `orders/letters/${refDoc.name}`);
        const uploadFile = await uploadBytes(orderDocRef, refDoc, metadata);
        refDocUrl = await getDownloadURL(uploadFile.ref);
    }
    var path = collection(db, 'orders');
    await addDoc(path, {
        createdAt: new Date().toISOString(),
        uid, email, name, phone, gst, pan, refNo, sampleQty, tests, refDoc: refDocUrl, approved: 'Pending'
    });
}



// export const placeOrder = async ({ refNo, orderType, sampleQty, tests, refDoc }) => {
//     const uid = auth.currentUser.uid;
//     // const tasks = await (await getDoc(doc(db, 'settings/tasks'))).data()   
//     const testsRequired = tests.split(', ');
//     Object.keys(tasks).forEach(id => {
//         let task = tasks[id];

//         if (task.type === 'testing' && !testsRequired.includes(task.name)) {
//             task.planned = 'Not Required';
//         }

//         if (task.dependOn == 'orderDate' && (task.planned == "" || !task.planned)) {
//             let [timeVal, timeType] = task.time.split(' ');
//             task.planned = addDays(new Date(), +timeVal);
//         }
//     })

//     const metadata = { contentType: refDoc.type }
//     const orderDocRef = storageRef(storage, `orders/letters/${refDoc.name}`);
//     const uploadFile = await uploadBytes(orderDocRef, refDoc, metadata);
//     const refDocUrl = await getDownloadURL(uploadFile.ref);
//     var path = collection(db, 'orders');
//     await addDoc(path, {
//         uid, refNo, orderType, sampleQty, tests, refDoc: refDocUrl, progress: tasks, status: 'Pending'
//     });
// }






//----get user orders---
export const getUserOrders = async () => {
    const orders = [];
    const uid = auth.currentUser.uid;
    const ordersRef = collection(db, 'orders');
    const q = query(ordersRef, where("uid", "==", uid), orderBy("createdAt", 'desc'));
    const data = await getDocs(q);
    data.forEach(d => {
        orders.push({ id: d.id, ...d.data() });
    })
    return orders
}

//----get pending orders for approval---
export const getPendingOrdersForApproval = async () => {
    const orders = [];
    const ordersRef = collection(db, 'orders');
    const q = query(ordersRef, where("approved", "==", "Pending"));
    const docSnaps = await getDocs(q);
    docSnaps.forEach(docSnap => {
        orders.push({ id: docSnap.id, ...docSnap.data() });
    })
    return orders
}


//----Approve Order---
export const approveOrder = async (order) => {
    const docRef = doc(db, `orders/${order.id}`);
    const tasks = await getAllTasks();
    const reqTests = order.tests;
    let orderDate = new Date(order.createdAt);

    Object.entries(tasks).forEach(([taskId, task]) => {
        if (task.dependOn === 'orderDate') {
            let planned = addDays(new Date(orderDate), task.timeInHours);
            task.planned = planned;
            task.actual = '';
            if (reqTests.includes(taskId)) {
                task.required = true;
            }
        }
    });

    updateDoc(docRef, {
        approved: 'Approved',
        fms: tasks
    });
}

//----reject Order---
export const rejectOrder = async (orderId) => {
    const docRef = doc(db, `orders/${orderId}`);
    updateDoc(docRef, {
        approved: 'Rejected'
    });
}


//----get user orders---
export const getPendingOrders = async () => {
    const orders = [];
    const ordersRef = collection(db, 'orders');
    const q = query(ordersRef, where("completed", "==", "Pending"));
    const docSnaps = await getDocs(q);
    docSnaps.forEach(docSnap => {
        orders.push({ id: docSnap.id, ...docSnap.data() });
    })
    return orders
}









// const getOrder = async (userId) => {
//     var path = doc(db, 'db/orders');
//     let q = query(path, where("/.userId", "==", userId))
//     var docSnap = await getDoc(q);
//     console.log(docSnap.data())
// }

// const getAllOrder = async () => {
//     var path = doc(db, 'db/orders');
//     var docSnap = await getDoc(path);
//     console.log(docSnap.data())
// }

// const updateOrder = async () => {

// }








//------Helpers------
const addDays = (date, days) => {
    console.log(date, days)
    date.setDate(date.getDate() + days);
    return date.toISOString();
}

const addHours = (date, hours) => {
    console.log(date, hours)
    date.setDate(date.getDate() + hours);
    return date.toISOString();
}
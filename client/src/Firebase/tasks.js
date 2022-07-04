
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
    orderBy
} from 'firebase/firestore'




//----get all tasks----
export const getAllTasks = async () => {
    const taskRef = doc(db, 'settings/tasks');
    const taskList = await (await getDoc(taskRef)).data();
    return taskList.tasks;
}


// //----get my tasks---
// export const getMyTasks = async () => {
//     const orders = await getPendingOrders();
//     const allTasks = await getAllTasks();
//     const uid = auth.currentUser.uid;
//     const myTasks = allTasks.filter(r => r.doer === uid);

//     orders.forEach(r => {
//         let progress = r.progress;
//         Object.entries(progress).forEach(([key, val]) => {

//         })
//     })


// }
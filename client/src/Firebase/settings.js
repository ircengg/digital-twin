import { db } from './config'
import {
    doc,
    getDoc
} from 'firebase/firestore'



//----get tests----
export const getTestList = async () => {
    const testRef = doc(db, 'settings/tests');
    const testList = await (await getDoc(testRef)).data();
    return testList;
}


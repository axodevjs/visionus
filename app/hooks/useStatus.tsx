import {collection, doc, getDocs, query, serverTimestamp, setDoc, where} from "firebase/firestore";
import {auth, db} from "../firebase/firebase";

export const useStatus = () => {
    const saveStatus = async (level: number) => {
        const statusesCollection = collection(db, 'statuses')

        const todayStart = new Date()
        todayStart.setHours(0, 0, 0, 0)

        const todayEnd = new Date(todayStart)
        todayEnd.setDate(todayEnd.getDate() + 1)

        const userStatusQuery = query(statusesCollection, where('uid', '==', auth.currentUser.uid), where('date', '>=', todayStart), where('date', '<=', todayEnd))
        const querySnapshot = await getDocs(userStatusQuery)

        if (querySnapshot.size > 0) {
            const existingStatusDoc = querySnapshot.docs[0]
            await setDoc(existingStatusDoc.ref, {
                level,
                date: serverTimestamp()
            }, {merge: true})
        } else {
            await setDoc(doc(statusesCollection), {
                uid: auth.currentUser.uid,
                level,
                date: serverTimestamp()
            }, {merge: true})
        }
    }

    return {saveStatus}
}
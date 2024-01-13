import {doc, setDoc} from "firebase/firestore";
import {auth, db} from "../firebase/firebase";

export const useEverydayTime = () => {
    const saveEverydayTime = async (minutes: number) => {
        const userRef = doc(db, 'users', auth.currentUser.uid)
        await setDoc(userRef, {
            dayPlan: minutes
        }, {merge: true})
    }

    return {saveEverydayTime}
}
import {doc, setDoc} from "firebase/firestore";
import {auth, db} from "../firebase/firebase";

export const useAge = () => {
    const saveAge = async (age: number) => {
        const userDocRef = doc(db, 'users', auth.currentUser.uid);

        await setDoc(userDocRef, {
            age
        }, { merge: true });
    }

    return {saveAge}
}
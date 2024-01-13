import {useEffect} from "react";
import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";
import { signInWithCredential, GoogleAuthProvider } from "firebase/auth";
import googleSignInConfig from "../utils/googleSignInConfig";
import {auth, db} from "../firebase/firebase";
import { getFirestore, doc, setDoc } from 'firebase/firestore';

export const TOKEN_KEY = 'userToken'

const useGoogleSignIn = () => {
    useEffect(() => {
        const configureGoogleSignIn = async () => {
            await GoogleSignin.configure(googleSignInConfig)
        }

        configureGoogleSignIn()
    }, [])

    const signInWithGoogle = async (isSilent: boolean) => {
        try {
            await GoogleSignin.hasPlayServices();

            let userInfo;
            if (isSilent) {
                userInfo = await GoogleSignin.signIn();
            } else {
                userInfo = await GoogleSignin.signInSilently();
                console.log('silently')
            }

            const googleCredential = GoogleAuthProvider.credential(userInfo.idToken);
            await signInWithCredential(auth, googleCredential);

            // Добавление данных в Firestore
            const userDocRef = doc(db, 'users', auth.currentUser.uid);

            await setDoc(userDocRef, {
                displayName: auth.currentUser.displayName,
                email: auth.currentUser.email,
            }, { merge: true });

            console.log("Google Sign-In successful");
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log("Google Sign-In cancelled");
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log("Google Sign-In in progress");
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log("Google Play Services not available");
            } else {
                console.error("Google Sign-In error:", error);
            }
        }
    }

    const signOut = async () => {
        try {
            await GoogleSignin.signOut();
           auth.signOut().then(data => console.log(data))
        } catch (error) {
            console.error(error);
        }
    };

    return {
        signInWithGoogle,
        signOut
    }
};

export default useGoogleSignIn;
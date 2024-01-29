import {useEffect, useState} from "react";
import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";
import { signInWithCredential, GoogleAuthProvider } from "firebase/auth";
import googleSignInConfig from "../utils/googleSignInConfig";
import { auth, db } from "../firebase/firebase";
import { doc, setDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { onAuthStateChanged } from 'firebase/auth';
import {useNavigation} from "@react-navigation/native";

export const TOKEN_KEY = 'userToken';

const useGoogleSignIn = () => {
    const [isSilentSignInInProgress, setIsSilentSignInInProgress] = useState(false);

    useEffect(() => {
        const configureGoogleSignIn = async () => {
            await GoogleSignin.configure(googleSignInConfig);
        };

        configureGoogleSignIn();
    }, []);

    const signInWithGoogle = async (isSilent: boolean) => {
        try {
            await GoogleSignin.hasPlayServices();

            let userInfo;
            if (isSilent && !isSilentSignInInProgress) {
                try {
                    setIsSilentSignInInProgress(true);
                    userInfo = await GoogleSignin.signInSilently();
                } catch (silentError) {
                    console.log("Silent sign-in error:", silentError);
                    userInfo = await GoogleSignin.signIn();
                } finally {
                    setIsSilentSignInInProgress(false);
                }
            } else {
                userInfo = await GoogleSignin.signIn();
            }

            const googleCredential = GoogleAuthProvider.credential(userInfo.idToken);
            await signInWithCredential(auth, googleCredential);

            // Check if auth.currentUser and its properties are defined
            if (auth.currentUser && auth.currentUser.uid) {
                const userDocRef = doc(db, 'users', auth.currentUser.uid);

                await setDoc(userDocRef, {
                    displayName: auth.currentUser.displayName,
                    email: auth.currentUser.email,
                }, { merge: true });

                await AsyncStorage.setItem(TOKEN_KEY, JSON.stringify(userInfo));

                console.log("Google Sign-In successful");
            } else {
                console.error("Error: auth.currentUser or its properties are undefined");
            }
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_REQUIRED) {
                // Handle the case where the user needs to sign in
                console.log("User needs to sign in");
                // You might want to redirect to a sign-in screen or display a message to the user
            } else {
                // Handle other errors
                console.error("Google Sign-In error:", error);
            }
        }
    };

    const signOut = async () => {
        try {
            await GoogleSignin.signOut();
            await auth.signOut()
            await AsyncStorage.removeItem(TOKEN_KEY);
        } catch (error) {
            console.error(error);
        }
    };

    const checkAuthenticationState = () => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("User is already signed in");
            } else {
                console.log("User is not signed in, initiating Google Sign-In");
                signInWithGoogle(true);
            }
        });

        return unsubscribe;
    };

    useEffect(() => {
        checkAuthenticationState();
    }, []);

    return {
        signInWithGoogle,
        signOut,
    };
};

export default useGoogleSignIn;

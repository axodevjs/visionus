import {useEffect} from "react";
import {GoogleSignin} from "@react-native-google-signin/google-signin";
import googleSignInConfig from "../utils/googleSignInConfig";

const useGoogleSignIn = () => {
    useEffect(() => {
        const configureGoogleSignIn = async () => {
            await GoogleSignin.configure(googleSignInConfig)
        }

        configureGoogleSignIn()
    }, [])

    const signInWithGoogle = async () => {
        try {
            const userInfo = await GoogleSignin.signIn()
            console.log(userInfo)
        }
        catch (e) {
            console.log('Google Sign In error', e)
        }
    }

    return {
        signInWithGoogle
    }
};

export default useGoogleSignIn;
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { GoogleAuthProvider } from 'firebase/auth'
import { useEffect } from 'react'
import { signInWithGoogle } from '../firebase/firebase'
import googleSignInConfig from '../utils/googleSignInConfig'

const useGoogleAuth = () => {
	useEffect(() => {
		GoogleSignin.configure({ webClientId: googleSignInConfig.webClientId })
	}, [])

	const signIn = async () => {
		try {
			await GoogleSignin.hasPlayServices()
			const userInfo = await GoogleSignin.signIn()

			// firebase auth
			const googleCredential = GoogleAuthProvider.credential(userInfo.idToken)
			await signInWithGoogle(googleCredential)
		} catch (error) {
			console.log(error)
		}
	}

	return { signIn }
}

export default useGoogleAuth

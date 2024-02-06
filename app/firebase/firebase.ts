import { getFirestore } from '@firebase/firestore'
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'
import { initializeApp } from 'firebase/app'
import * as firebaseAuth from 'firebase/auth'
import { getAuth, initializeAuth, signInWithCredential } from 'firebase/auth'
const firebaseConfig = {
	apiKey: 'AIzaSyDVqXHAn7n9ny8y302pTOtspF0qUnToxMk',
	authDomain: 'visionus-bd48e.firebaseapp.com',
	projectId: 'visionus-bd48e',
	storageBucket: 'visionus-bd48e.appspot.com',
	messagingSenderId: '1041997156650',
	appId: '1:1041997156650:web:3d51dbf9811dfa782dce53',
	measurementId: 'G-WPEXD45SNF',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)

const reactNativePersistence = (firebaseAuth as any).getReactNativePersistence
initializeAuth(app, {
	persistence: reactNativePersistence(ReactNativeAsyncStorage),
})

export const auth = getAuth(app)
export const db = getFirestore(app)

export const signInWithGoogle = async googleCredential => {
	try {
		const result = await signInWithCredential(auth, googleCredential)
		const user = result.user

		console.log('Successfully signed in with Firebase')
		return user
	} catch (error) {
		console.error('Error signing in with Google:', error)
		throw error
	}
}

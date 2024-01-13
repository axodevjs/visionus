import { initializeApp } from 'firebase/app'
import {getAuth, initializeAuth} from 'firebase/auth'
import {getFirestore} from '@firebase/firestore'

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

initializeAuth(app);

export const auth = getAuth();
export const db = getFirestore();

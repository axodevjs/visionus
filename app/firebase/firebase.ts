import { getAnalytics } from 'firebase/analytics'
import { initializeApp } from 'firebase/app'

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
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)

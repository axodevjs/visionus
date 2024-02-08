import { doc, getDoc, setDoc } from 'firebase/firestore'
import React from 'react'
import { Image, Text, View } from 'react-native'
import Logo from '../../../assets/img/logo.png'
import MainLayout from '../../components/Layouts/MainLayout/MainLayout'
import { auth, db } from '../../firebase/firebase'
import useGoogleAuth from '../../hooks/useGoogleAuth'
import { ibl, ir } from '../../utils/fontStyles'

const StartScreen = ({ navigation }) => {
	const { signIn } = useGoogleAuth()

	const createFirestoreUser = async user => {
		try {
			const userRef = doc(db, 'users', user.uid)
			const userDoc = await getDoc(userRef)

			if (!userDoc.exists()) {
				console.log('not exists')
				await setDoc(userRef, {
					uid: user.uid,
					age: 18,
					dayPlanInMinutes: 10,
				})
			}
		} catch (error) {
			console.log('Error with createFirestoreUser')
		}
	}

	const onPressNext = async () => {
		await signIn()
		await createFirestoreUser(auth.currentUser)
		await navigation.navigate('Age')
	}

	return (
		<MainLayout onPressBtn={onPressNext} btnText='Начать'>
			<Image
				style={{ height: 293, width: 289 }}
				resizeMode='contain'
				source={Logo}
			/>
			<View>
				<Text className='text-5xl text-center' style={ibl}>
					Расслабь свои глаза
				</Text>
				<Text className='text-sm text-gray-500 mt-8 text-center' style={ir}>
					Твои глаза – это окно в твою душу. Заботься о них, и они будут светить
					ярче.
				</Text>
			</View>
		</MainLayout>
	)
}

export default StartScreen

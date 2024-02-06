import {
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	setDoc,
	updateDoc,
	where,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { View } from 'react-native'
import { auth, db } from '../../firebase/firebase'
import useUser from '../../hooks/useUser'
import SelectSmiles from '../SelectSmiles/SelectSmiles'
import MiniTitle from '../ui/MiniTitle/MiniTitle'

const RateYourStatus = () => {
	const [currentLevel, setCurrentLevel] = useState(null)
	const { user } = useUser()

	useEffect(() => {
		// Получаем текущий статус пользователя из Firestore
		const getStatus = async () => {
			try {
				const statusesRef = collection(db, 'statuses')
				const q = query(statusesRef, where('uid', '==', user))
				const querySnapshot = await getDocs(q)
				querySnapshot.forEach(doc => {
					console.log('status: ', doc)
				})
			} catch (error) {
				console.error('Error getting status:', error)
			}
		}

		if (auth?.currentUser) {
			getStatus()
		}
	}, [auth])

	const updateLevel = async (level: number) => {
		setCurrentLevel(level)
		try {
			const today = new Date()
			const statusRef = doc(
				db,
				'statuses',
				`${auth.currentUser.uid}_${today.toISOString().slice(0, 10)}`
			)

			// Проверяем существует ли документ на сегодня
			const statusSnapshot = await getDoc(statusRef)

			if (statusSnapshot.exists()) {
				// Если существует, обновляем
				await updateDoc(statusRef, {
					level,
				})
			} else {
				// Если не существует, создаем новый
				await setDoc(statusRef, {
					uid: auth.currentUser.uid,
					date: today,
					level: level,
				})
			}
		} catch (error) {
			console.error('Error updating status:', error)
		}
	}

	return (
		<View className={'py-4 mt-5 w-full flex flex-col items-center'}>
			<MiniTitle text={'Ваше состояние сегодня'} />
			<SelectSmiles
				type={'small'}
				currentLevel={currentLevel}
				setCurrentLevel={updateLevel}
			/>
		</View>
	)
}

export default RateYourStatus

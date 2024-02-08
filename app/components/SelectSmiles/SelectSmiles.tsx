import { endOfDay, startOfDay } from 'date-fns'
import {
	collection,
	doc,
	getDoc,
	onSnapshot,
	query,
	setDoc,
	updateDoc,
	where,
} from 'firebase/firestore'
import React, { FC, useEffect } from 'react'
import { Pressable, Text, View } from 'react-native'
import { auth, db } from '../../firebase/firebase'
import useUser from '../../hooks/useUser'
import { ir } from '../../utils/fontStyles'
import { ISmile, smiles } from '../../utils/smiles'
import { ISelectSmiles } from './types'

const todayStart = startOfDay(new Date())
const todayEnd = endOfDay(new Date())

const SelectSmiles: FC<ISelectSmiles> = ({
	type,
	currentLevel,
	setCurrentLevel,
}) => {
	const { user } = useUser()

	const onPress = (smile: ISmile) => {
		updateLevel(smile.level)
	}

	useEffect(() => {
		// Получаем текущий статус пользователя из Firestore
		const getStatus = async () => {
			try {
				const statusesRef = collection(db, 'statuses')
				const q = query(
					statusesRef,
					where('uid', '==', auth?.currentUser?.uid),
					where('date', '>=', todayStart),
					where('date', '<=', todayEnd)
				)

				// Подписываемся на изменения в результате запроса
				const unsubscribe = onSnapshot(q, querySnapshot => {
					querySnapshot.forEach(doc => {
						setCurrentLevel(doc.data()?.level)
					})
				})

				// Возвращаем функцию отписки в useEffect для очистки подписки при размонтировании компонента
				return () => unsubscribe()
			} catch (error) {
				console.error('Error getting status:', error)
			}
		}

		if (auth?.currentUser?.uid) {
			getStatus()
		}
	}, [auth, user])

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
		<View className={'flex flex-row gap-5 w-full justify-center'}>
			{smiles.map((smile, i) => (
				<Pressable
					onPress={() => onPress(smile)}
					className={`rounded-full bg-gray-100 flex justify-center items-center 
                    ${type === 'big' ? 'w-10 h-10' : 'w-8 h-8'}
                    ${currentLevel === i + 1 && 'bg-blue-600'}
                    `}
					key={i}
				>
					<Text style={ir}>{smile.smile}</Text>
				</Pressable>
			))}
		</View>
	)
}

export default SelectSmiles

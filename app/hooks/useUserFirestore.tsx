import {
	DocumentData,
	DocumentSnapshot,
	doc,
	onSnapshot,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../firebase/firebase'
import useUser from './useUser'

export interface IUserFirestore {
	uid: string
	age: number
	dayPlanInMinutes: number
}

export const useUserFirestore = () => {
	const [userFirestore, setUserFirestore] = useState<IUserFirestore>()
	const { user } = useUser()

	useEffect(() => {
		let unsub
		if (user?.uid) {
			unsub = onSnapshot(
				doc(db, 'users', user?.uid),
				(doc: DocumentSnapshot<DocumentData>) => {
					console.log('Current fireuser: ', doc.data())
					const userData = doc.data() as IUserFirestore
					setUserFirestore(userData)
				}
			)
		}

		return unsub
	}, [user?.uid])

	return { userFirestore }
}

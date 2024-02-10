import { endOfDay, startOfDay } from 'date-fns'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { auth, db } from '../firebase/firebase'

const useTodayExerciseTime = () => {
	const [todayExerciseTime, setTodayExerciseTime] = useState(0)
	const [percentCompleted, setPercentCompleted] = useState(0)

	useEffect(() => {
		const fetchTodayExerciseTime = async () => {
			try {
				if (!auth.currentUser) return

				const today = new Date()
				const startOfDayDate = startOfDay(today)
				const endOfDayDate = endOfDay(today)

				const q = query(
					collection(db, 'users', auth.currentUser.uid, 'exercises'),
					where('date', '>=', startOfDayDate),
					where('date', '<=', endOfDayDate)
				)

				const unSubscribe = onSnapshot(q, snapshot => {
					snapshot.forEach(doc => {
						setTodayExerciseTime(doc.data()?.timeInSec)
						setPercentCompleted(doc.data()?.percentCompleted)
					})
				})

				return () => unSubscribe()
			} catch (error) {
				console.log('Error in fetchTodayExerciseTime', error)
			}
		}

		fetchTodayExerciseTime()
	}, [])

	return { todayExerciseTime, percentCompleted }
}

export default useTodayExerciseTime

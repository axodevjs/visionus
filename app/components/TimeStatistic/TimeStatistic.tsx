import { endOfWeek, startOfWeek } from 'date-fns'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { auth, db } from '../../firebase/firebase'
import Statistic from '../ui/Statistic/Statistic'
import WeekStatistic from '../ui/WeekStatistic/WeekStatistic'

const TimeStatistic = () => {
	const [weekData, setWeekData] = useState([])

	useEffect(() => {
		const fetchWeekData = async () => {
			try {
				if (!auth.currentUser) return

				// Определите начало и конец текущей недели
				const currentDate = new Date()
				const startOfWeekDate = startOfWeek(currentDate, { weekStartsOn: 1 })
				const endOfWeekDate = endOfWeek(currentDate, { weekStartsOn: 1 })

				// Получите данные из коллекции "statuses" для текущего пользователя и текущей недели
				const q = query(
					collection(db, 'users', auth.currentUser.uid, 'exercises'),
					where('date', '>=', startOfWeekDate),
					where('date', '<=', endOfWeekDate)
				)

				const unsubscribe = onSnapshot(q, snapshot => {
					const weekDataArray = []
					snapshot.forEach(doc => {
						let exercise = doc.data()
						const date = exercise.date.toDate()
						exercise.date = date
						exercise.value = exercise.percentCompleted
						weekDataArray.push(exercise)
					})

					// Упорядочьте данные по дате
					weekDataArray.sort((a, b) => a.date - b.date)

					// Установите упорядоченные данные в состояние
					setWeekData(weekDataArray)
				})

				return unsubscribe
			} catch (error) {
				console.error('Error fetching week data:', error)
			}
		}

		fetchWeekData()
	}, [auth.currentUser])
	return (
		<Statistic title={'Время тренировок'}>
			<WeekStatistic type={'progress'} data={weekData} />
		</Statistic>
	)
}

export default TimeStatistic

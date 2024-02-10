import { collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Text } from 'react-native'
import useCategoryStore from '../../../store/useCategoryStore/useCategoryStore'
import useExerciseStore from '../../../store/useExerciseStore/useExerciseStore'
import ExerciseLayout from '../../components/Layouts/ExerciseLayout/ExerciseLayout'
import { auth, db } from '../../firebase/firebase'
import { useUserFirestore } from '../../hooks/useUserFirestore'
import { ib } from '../../utils/fontStyles'
import { exercisesList } from '../../utils/testdb'

const ExerciseScreen = ({ navigation }) => {
	const { currentCategory } = useCategoryStore()
	const {
		currentTask,
		setCurrentExercise,
		setCurrentTask,
		enqueueTask,
		startTimer,
		dequeueTask,
		setTime,
		taskQueue,
	} = useExerciseStore()
	const [taskIndex, setTaskIndex] = useState(0)
	const [totalTimeSec, setTotalTimeSec] = useState(0)
	const { userFirestore } = useUserFirestore()

	useEffect(() => {
		startExercise()
	}, [])

	const startExercise = () => {
		const exercise = exercisesList
			?.filter(x => x?.categoryId === currentCategory?.id)
			?.sort(() => 0.5 - Math.random())[0]
		setCurrentExercise(exercise)

		for (const task of exercise.tasks) {
			setTotalTimeSec(prev => prev + task.timeInSec)
			enqueueTask(task)
		}
	}

	useEffect(() => {
		if (taskQueue?.length > 0) {
			startTask()
		}
	}, [taskQueue])

	const startTask = () => {
		const task = taskQueue[taskIndex]
		if (task) {
			setCurrentTask(task)
			setTime(task.timeInSec)
			startTimer(
				() => {
					// Do something during each tick if needed
				},
				async () => {
					// Если таски закончились
					if (taskQueue?.length - 1 <= 0) {
						// Сохраняю результат тренировки
						try {
							const today = new Date()

							// Формируем ссылку на документ упражнения для текущего пользователя на сегодняшнюю дату
							const exerciseRef = doc(
								collection(db, 'users', auth.currentUser.uid, 'exercises'),
								today.toISOString().slice(0, 10)
							)

							// Проверяем существует ли документ на сегодня
							const exerciseSnapshot = await getDoc(exerciseRef)

							if (exerciseSnapshot.exists()) {
								// Если существует, вычисляем процент выполнения тренировки
								const existingTime = exerciseSnapshot.data().timeInSec || 0
								const existingPercent =
									exerciseSnapshot.data().percentCompleted || 0

								const updatedTime = existingTime + totalTimeSec
								const updatedPercent =
									(updatedTime / 60 / userFirestore?.dayPlanInMinutes) * 100

								// Обновляем документ в базе данных
								await updateDoc(exerciseRef, {
									timeInSec: updatedTime,
									percentCompleted: updatedPercent,
								})
							} else {
								// Если не существует, создаем новый
								const newPercent =
									(totalTimeSec / 60 / userFirestore?.dayPlanInMinutes) * 100

								await setDoc(exerciseRef, {
									uid: auth.currentUser.uid,
									date: today,
									timeInSec: totalTimeSec,
									percentCompleted: newPercent,
								})
							}
						} catch (error) {
							console.error('Error updating exercise:', error)
						}

						await navigation.navigate('FinishExercise')
					}

					await dequeueTask()
					await setTaskIndex(prev => prev + 1)
				}
			)
		} else {
			navigation.navigate('Home')
		}
	}

	return (
		<ExerciseLayout
			onPressBtn={() => {}}
			title={currentCategory?.name}
			onClose={() => {
				navigation.navigate('Home')
			}}
			btnText={'Начать'}
		>
			<Text style={ib} className={'text-xl text-center'}>
				{currentTask?.name}
			</Text>
		</ExerciseLayout>
	)
}

export default ExerciseScreen

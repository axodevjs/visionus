import React, { useEffect, useState } from 'react'
import { Text } from 'react-native'
import useCategoryStore from '../../../store/useCategoryStore/useCategoryStore'
import useExerciseStore from '../../../store/useExerciseStore/useExerciseStore'
import ExerciseLayout from '../../components/Layouts/ExerciseLayout/ExerciseLayout'
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

	useEffect(() => {
		startExercise()
	}, [])

	const startExercise = () => {
		const exercise = exercisesList
			?.filter(x => x?.categoryId === currentCategory?.id)
			?.sort(() => 0.5 - Math.random())[0]
		setCurrentExercise(exercise)

		for (const task of exercise.tasks) {
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
				() => {
					if (taskQueue?.length - 1 <= 0) {
						navigation.navigate('Home')
					}

					dequeueTask()
					setTaskIndex(prev => prev + 1)
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
			<Text style={ib} className={'text-xl'}>
				{currentTask?.name}
			</Text>
		</ExerciseLayout>
	)
}

export default ExerciseScreen

import React, { useEffect } from 'react'
import useExerciseStore from '../../../store/useExerciseStore/useExerciseStore'
import Categories from '../../components/Categories/Categories'
import ExerciseLayout from '../../components/Layouts/ExerciseLayout/ExerciseLayout'

const CategoryScreen = ({ navigation }) => {
	const { setCurrentExercise, setCurrentTask, dequeueTask, taskQueue } =
		useExerciseStore()

	const onPressBtn = () => {
		navigation.navigate('Exercise')
	}

	useEffect(() => {
		setCurrentExercise(null)
		setCurrentTask(null)

		for (let i = 0; i < taskQueue.length; i++) {
			dequeueTask()
		}
	}, [])

	return (
		<ExerciseLayout
			onPressBtn={onPressBtn}
			title={'Выберите категорию'}
			onClose={() => {
				navigation.navigate('Home')
			}}
			btnText={'Начать'}
		>
			<Categories />
		</ExerciseLayout>
	)
}

export default CategoryScreen

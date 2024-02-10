import React from 'react'
import { Text, View } from 'react-native'
import ProgressCircle from '../../components/ProgressCircle/ProgressCircle'
import Button from '../../components/ui/Button/Button'
import { ibl } from '../../utils/fontStyles'

const FinishExerciseScreen = ({ navigation }) => {
	return (
		<View
			className={
				'w-full h-full pt-12 pb-8 px-8 bg-white flex flex-col items-center justify-between'
			}
		>
			<Text style={ibl} className='text-center text-3xl'>
				Вы выполнили тренировку!
			</Text>

			<ProgressCircle fill={64} type='big' />

			<Button
				type={'blue'}
				onPress={() => navigation.navigate('Home')}
				text={'Отлично!'}
			/>
		</View>
	)
}

export default FinishExerciseScreen

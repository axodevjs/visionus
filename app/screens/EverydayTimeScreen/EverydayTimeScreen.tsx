import { doc, setDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { View } from 'react-native'
import QuizLayout from '../../components/Layouts/QuizLayout/QuizLayout'
import SelectButton from '../../components/ui/SelectButton/SelectButton'
import { db } from '../../firebase/firebase'
import useUser from '../../hooks/useUser'

const EverydayTimeScreen = ({ navigation }) => {
	const [selectedTime, setSelectedTime] = useState('10 мин')
	const { user } = useUser()

	const onPressNext = async () => {
		try {
			const userRef = doc(db, 'users', user.uid)
			await setDoc(
				userRef,
				{ dayPlanInMinutes: parseInt(selectedTime?.replace(/\D/g, '')) },
				{ merge: true }
			)

			await navigation.navigate('Home')
		} catch (e) {
			console.log(e)
		}
	}

	const handleSelect = (time: string) => {
		setSelectedTime(time)
	}

	return (
		<QuizLayout
			onPressBtn={onPressNext}
			btnText={'Готово'}
			title={'Сколько ежедневно вы готовы уделять упражнениям?'}
		>
			<View
				className={'flex flex-row w-full justify-center'}
				style={{ gap: 24 }}
			>
				<SelectButton
					active={selectedTime === '5 мин'}
					text={'5 мин'}
					onPress={() => {
						handleSelect('5 мин')
					}}
				/>
				<SelectButton
					active={selectedTime === '10 мин'}
					text={'10 мин'}
					onPress={() => {
						handleSelect('10 мин')
					}}
				/>
				<SelectButton
					active={selectedTime === '15 мин'}
					text={'15 мин'}
					onPress={() => {
						handleSelect('15 мин')
					}}
				/>
			</View>
		</QuizLayout>
	)
}

export default EverydayTimeScreen

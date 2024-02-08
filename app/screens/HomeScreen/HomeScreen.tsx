import React, { useState } from 'react'
import { View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import MainLayout from '../../components/Layouts/MainLayout/MainLayout'
import ProgressCircle from '../../components/ProgressCircle/ProgressCircle'
import RateYourStatus from '../../components/RateYourStatus/RateYourStatus'
import StatusStatistic from '../../components/StatusStatistic/StatusStatistic'
import TimeStatistic from '../../components/TimeStatistic/TimeStatistic'
import { useUserFirestore } from '../../hooks/useUserFirestore'

const HomeScreen = ({ navigation }) => {
	const [fill, setFill] = useState(65)
	const { userFirestore } = useUserFirestore()

	const onPressStart = () => {
		navigation.navigate('Category')
	}

	return (
		<MainLayout onPressBtn={onPressStart} btnText={'Начать тренировку'}>
			<ScrollView className={'w-full'} showsVerticalScrollIndicator={false}>
				<View className={'w-full flex flex-col items-center pb-7'}>
					<ProgressCircle type={'big'} fill={fill} />
					<RateYourStatus />
					<StatusStatistic />
					<TimeStatistic />
				</View>
			</ScrollView>
		</MainLayout>
	)
}

export default HomeScreen

import React from 'react'
import { Image, Text, View } from 'react-native'
import Logo from '../../../assets/img/logo.png'
import MainLayout from '../../components/Layouts/MainLayout/MainLayout'
import useGoogleAuth from '../../hooks/useGoogleAuth'
import { ibl, ir } from '../../utils/fontStyles'

const StartScreen = ({ navigation }) => {
	const { signIn } = useGoogleAuth()

	const onPressNext = async () => {
		await signIn()
	}

	return (
		<MainLayout onPressBtn={onPressNext} btnText='Начать'>
			<Image
				style={{ height: 293, width: 289 }}
				resizeMode='contain'
				source={Logo}
			/>
			<View>
				<Text className='text-5xl text-center' style={ibl}>
					Расслабь свои глаза
				</Text>
				<Text className='text-sm text-gray-500 mt-8 text-center' style={ir}>
					Твои глаза – это окно в твою душу. Заботься о них, и они будут светить
					ярче.
				</Text>
			</View>
		</MainLayout>
	)
}

export default StartScreen

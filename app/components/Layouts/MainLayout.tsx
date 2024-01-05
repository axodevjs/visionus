import React, { FC } from 'react'
import { View } from 'react-native'
import Button from '../ui/Button/Button'

interface IMainLayout {
	children: React.ReactNode
	onPressBtn: () => void
	btnText: string
}

const MainLayout: FC<IMainLayout> = ({ children, onPressBtn, btnText }) => {
	return (
		<View className='bg-white pb-8 pt-16 px-8 h-full w-full flex flex-col justify-between items-center'>
			{children}
			<Button onPress={onPressBtn} type='black' text={btnText} />
		</View>
	)
}

export default MainLayout

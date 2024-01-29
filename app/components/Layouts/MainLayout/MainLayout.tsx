import React, { FC } from 'react'
import { View } from 'react-native'
import Button from '../../ui/Button/Button'
import Padding from "../../ui/Padding/Padding";

interface IMainLayout {
	children: React.ReactNode
	onPressBtn: () => void
	btnText: string
}

const MainLayout: FC<IMainLayout> = ({ children, onPressBtn, btnText }) => {
	return (
		<Padding className={"bg-white"}>
			<View className='bg-white h-full w-full flex flex-col justify-between items-center'>
				{children}
				<Button onPress={onPressBtn} type='black' text={btnText} />
			</View>
		</Padding>
	)
}

export default MainLayout

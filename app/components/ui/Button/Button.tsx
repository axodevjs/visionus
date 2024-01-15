import React from 'react'
import { Pressable, Text } from 'react-native'

const Button = ({ type, text, onPress }) => {
	const ButtonStyles = {
		black: 'bg-black h-16 flex justify-center items-center w-full',
		blue: 'bg-blue-600 h-16 flex justify-center items-center w-full',
		miniBlue: 'bg-blue-600 h-14 flex justify-center items-center w-full',
	}

	const TextStyles = {
		black: 'text-white text-base font-urbanist',
		blue: 'text-white text-base font-urbanist',
		miniBlue: 'text-white text-sm font-urbanist',
	}

	return (
		<Pressable
			onPress={onPress}
			className={ButtonStyles[type]}
			style={{ borderRadius: 17 }}
		>
			<Text className={TextStyles[type]}>{text}</Text>
		</Pressable>
	)
}

export default Button

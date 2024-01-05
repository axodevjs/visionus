import React from 'react'
import { Pressable, Text } from 'react-native'

const Button = ({ type, text, onPress }) => {
	const ButtonStyles = {
		black: 'bg-black h-16 flex justify-center items-center w-full',
	}

	const TextStyles = {
		black: 'text-white text-base font-urbanist',
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

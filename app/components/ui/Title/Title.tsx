import React, { FC } from 'react'
import { Text } from 'react-native'
import { ibl } from '../../../utils/fontStyles'

interface ITitle {
	text: string
	className?: string
}

const Title: FC<ITitle> = ({ text, className }) => {
	return (
		<Text className={`text-2xl text-center ${className}}`} style={ibl}>
			{text}
		</Text>
	)
}

export default Title

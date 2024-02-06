import React, { FC } from 'react'
import { Pressable, Text, View } from 'react-native'
import { ir } from '../../utils/fontStyles'
import { ISmile, smiles } from '../../utils/smiles'
import { ISelectSmiles } from './types'

const SelectSmiles: FC<ISelectSmiles> = ({
	type,
	currentLevel,
	setCurrentLevel,
}) => {
	const onPress = (smile: ISmile) => {
		setCurrentLevel(smile.level)
	}

	return (
		<View className={'flex flex-row gap-5 w-full justify-center'}>
			{smiles.map((smile, i) => (
				<Pressable
					onPress={() => onPress(smile)}
					className={`rounded-full bg-gray-100 flex justify-center items-center 
                    ${type === 'big' ? 'w-10 h-10' : 'w-8 h-8'}
                    ${currentLevel === i + 1 && 'bg-blue-600'}
                    `}
					key={i}
				>
					<Text style={ir}>{smile.smile}</Text>
				</Pressable>
			))}
		</View>
	)
}

export default SelectSmiles

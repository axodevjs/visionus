import { isToday } from 'date-fns'
import React, { FC } from 'react'
import { Text, View } from 'react-native'
import { ir } from '../../../utils/fontStyles'
import { smiles } from '../../../utils/smiles'
import ProgressCircle from '../../ProgressCircle/ProgressCircle'

interface IStatisticDisplay {
	value: number | string
	day: string
	calculate: boolean
	date: string
}

const StatisticDisplay: FC<IStatisticDisplay> = ({
	value,
	calculate,
	day,
	date,
}) => {
	return (
		<View className={'items-center ml-4 first:ml-0'}>
			<View>
				{calculate ? (
					<ProgressCircle
						type={'small'}
						fill={(parseInt(value?.toString()) / 15) * 100}
					/>
				) : (
					<Text className={'text-xs text-black font-medium'} style={ir}>
						{smiles.find(smile => smile.level === value)?.smile || '?'}
					</Text>
				)}
			</View>
			<Text
				className={`mt-2.5 text-xs text-gray-500 ${
					isToday(new Date(date)) ? 'font-bold' : ''
				}`}
				style={ir}
			>
				{day}
			</Text>
		</View>
	)
}

export default StatisticDisplay

import { isSameDay } from 'date-fns'
import React, { FC, useEffect, useState } from 'react'
import { View } from 'react-native'
import { generateWeekDays } from '../../../utils/dateUtils'
import StatisticDisplay from './StatisticDisplay'
import { IWeekDay } from './types'

interface IWeekStatistic {
	type: 'progress' | 'smile'
	data: any
}

const WeekStatistic: FC<IWeekStatistic> = ({ type, data }) => {
	const [weekDays, setWeekDays] = useState<IWeekDay[]>([])

	useEffect(() => {
		const updatedWeekDays = generateWeekDays()
		setWeekDays(updatedWeekDays)
	}, [])

	return (
		<View className={'flex flex-row justify-around pt-2 items-end gap-4'}>
			{weekDays.map((day, i) => {
				const value =
					data.find(x => {
						const dataDate = new Date(x?.date)
						const dayDate = new Date(day?.date)

						return isSameDay(dataDate, dayDate)
					})?.value || 0

				return (
					<StatisticDisplay
						day={day.name}
						date={day.date}
						value={value}
						calculate={type === 'progress'}
						key={i}
					/>
				)
			})}
		</View>
	)
}

export default WeekStatistic

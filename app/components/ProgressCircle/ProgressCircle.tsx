import React, { FC } from 'react'
import { Text, View } from 'react-native'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import useTodayExerciseTime from '../../hooks/useTodayExerciseTime'
import { useUserFirestore } from '../../hooks/useUserFirestore'
import { ib, ir } from '../../utils/fontStyles'

interface IProgressCircle {
	fill: number
	type: 'big' | 'small'
}

const ProgressCircle: FC<IProgressCircle> = ({ fill, type }) => {
	const { userFirestore } = useUserFirestore()
	const { percentCompleted } = useTodayExerciseTime()

	return (
		<View className={'flex flex-col w-full items-center'}>
			<AnimatedCircularProgress
				duration={1000}
				size={type === 'big' ? 104 : 22}
				width={type === 'big' ? 12 : 2}
				fill={type === 'big' ? percentCompleted : fill}
				rotation={0}
				lineCap={'round'}
				tintColor='#2563eb'
				onAnimationComplete={() => {}}
				backgroundColor='#EAEAEA'
			>
				{fill =>
					type === 'big' && (
						<Text className={'text-xl text-black'} style={ib}>
							{parseInt(fill?.toString())}%
						</Text>
					)
				}
			</AnimatedCircularProgress>
			{type === 'big' && (
				<View
					className={'items-center flex-row'}
					style={{ gap: 14, marginTop: 14 }}
				>
					<View className={'bg-blue-600 w-4 h-4 rounded-full'} />
					<Text className={'text-sm text-black'} style={ir}>
						Дневная цель ({userFirestore?.dayPlanInMinutes} мин)
					</Text>
				</View>
			)}
		</View>
	)
}

export default ProgressCircle

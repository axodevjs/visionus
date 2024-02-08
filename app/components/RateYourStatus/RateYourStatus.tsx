import { useState } from 'react'
import { View } from 'react-native'
import useUser from '../../hooks/useUser'
import SelectSmiles from '../SelectSmiles/SelectSmiles'
import MiniTitle from '../ui/MiniTitle/MiniTitle'

const RateYourStatus = () => {
	const [currentLevel, setCurrentLevel] = useState(null)
	const { user } = useUser()

	return (
		<View className={'py-4 mt-5 w-full flex flex-col items-center'}>
			<MiniTitle text={'Ваше состояние сегодня'} />
			<SelectSmiles
				type={'small'}
				currentLevel={currentLevel}
				setCurrentLevel={setCurrentLevel}
			/>
		</View>
	)
}

export default RateYourStatus

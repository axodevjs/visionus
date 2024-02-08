import { doc, setDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import QuizLayout from '../../components/Layouts/QuizLayout/QuizLayout'
import Counter from '../../components/ui/Counter/Counter'
import { db } from '../../firebase/firebase'
import useUser from '../../hooks/useUser'

const AgeScreen = ({ navigation }) => {
	const [age, setAge] = useState(18)
	const { user } = useUser()

	const onPressNext = async () => {
		try {
			const userRef = doc(db, 'users', user.uid)
			setDoc(userRef, { age }, { merge: true })
		} catch (e) {
			console.log(e)
		}

		await navigation.navigate('EyesStatus')
	}

	return (
		<QuizLayout
			onPressBtn={onPressNext}
			btnText='Продолжить'
			title={'Сколько вам лет?'}
		>
			<Counter min={6} max={99} count={age} setCount={setAge} />
		</QuizLayout>
	)
}

export default AgeScreen

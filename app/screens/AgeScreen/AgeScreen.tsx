import React, {useState} from 'react'
import Counter from "../../components/ui/Counter/Counter";
import QuizLayout from "../../components/Layouts/QuizLayout/QuizLayout";
import AsyncStorage from '@react-native-async-storage/async-storage';

const AgeScreen = ({ navigation }) => {
	const [age, setAge] = useState(18)

	const onPressNext = async () => {
		try {
			await AsyncStorage.setItem('age', age.toString());
		} catch (e) {
			console.log(e)
		}

		await navigation.navigate("EyesStatus")
	}

	return (
		<QuizLayout onPressBtn={onPressNext} btnText='Продолжить' title={"Сколько вам лет?"}>
			<Counter min={6} max={99} count={age} setCount={setAge} />
		</QuizLayout>
	)
}

export default AgeScreen

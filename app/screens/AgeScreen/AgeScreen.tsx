import React, {useState} from 'react'
import Counter from "../../components/ui/Counter/Counter";
import QuizLayout from "../../components/Layouts/QuizLayout";

const AgeScreen = ({ navigation }) => {
	const [age, setAge] = useState(18)

	return (
		<QuizLayout onPressBtn={() => {navigation.navigate("EyesStatus")}} btnText='Продолжить' title={"Сколько вам лет?"}>
			<Counter min={6} max={99} count={age} setCount={setAge} />
		</QuizLayout>
	)
}

export default AgeScreen

import React, {useEffect, useState} from 'react'
import Counter from "../../components/ui/Counter/Counter";
import QuizLayout from "../../components/Layouts/QuizLayout/QuizLayout";
import {doc, setDoc} from "firebase/firestore";
import {auth, db} from "../../firebase/firebase";
import {useAge} from "../../hooks/useAge";

const AgeScreen = ({ navigation }) => {
	const [age, setAge] = useState(18)
	const {saveAge} = useAge()

	const onPressNext = async () => {
		await saveAge(age)
		await navigation.navigate("EyesStatus")
	}

	return (
		<QuizLayout onPressBtn={onPressNext} btnText='Продолжить' title={"Сколько вам лет?"}>
			<Counter min={6} max={99} count={age} setCount={setAge} />
		</QuizLayout>
	)
}

export default AgeScreen

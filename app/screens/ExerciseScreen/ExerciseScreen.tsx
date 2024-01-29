import React, {useEffect} from 'react';
import Categories from "../../components/Categories/Categories";
import ExerciseLayout from "../../components/Layouts/ExerciseLayout/ExerciseLayout";
import {Text, View} from "react-native";
import useCategoryStore from "../../../store/useCategoryStore/useCategoryStore";
import useExerciseStore from "../../../store/useExerciseStore/useExerciseStore";
import {ib} from "../../utils/fontStyles";
import {exercisesList} from "../../utils/testdb";

const ExerciseScreen = ({navigation}) => {
    const {currentCategory} = useCategoryStore()
    const {currentTask, currentExercise, setCurrentExercise, setCurrentTask} = useExerciseStore()
    const onPressBtn = () => {

    }

    useEffect(() => {
        const exercise = exercisesList?.filter(x => x?.categoryId === currentCategory?.id)[0]
        console.log(exercise)
    }, []);

    return (
        <ExerciseLayout onPressBtn={onPressBtn} title={currentCategory?.name} onClose={() => {navigation.navigate("Home")}} btnText={"Начать"}>
            <Text style={ib} className={'text-xl'}>{currentTask?.name}</Text>
        </ExerciseLayout>
    );
};

export default ExerciseScreen;
import React, {useEffect} from 'react';
import ExerciseLayout from "../../components/Layouts/ExerciseLayout/ExerciseLayout";
import Categories from "../../components/Categories/Categories";
import useExerciseStore from "../../../store/useExerciseStore/useExerciseStore";
import useCategoryStore from "../../../store/useCategoryStore/useCategoryStore";

const CategoryScreen = ({navigation}) => {
    const {setCurrentExercise, setCurrentTask} = useExerciseStore()
    const {currentCategory} = useCategoryStore()
    const onPressBtn = () => {
        navigation.navigate('Exercise')
    }

    useEffect(() => {
        setCurrentExercise(null)
        setCurrentTask(null)
    }, []);

    return (
        <ExerciseLayout onPressBtn={onPressBtn} title={'Выберите категорию'} onClose={() => {navigation.navigate("Home")}} btnText={"Начать"}>
            <Categories/>
        </ExerciseLayout>
    );
};

export default CategoryScreen;
import React, {useEffect, useState} from 'react';
import Categories from "../../components/Categories/Categories";
import ExerciseLayout from "../../components/Layouts/ExerciseLayout/ExerciseLayout";
import {Text, View} from "react-native";
import useCategoryStore from "../../../store/useCategoryStore/useCategoryStore";
import useExerciseStore from "../../../store/useExerciseStore/useExerciseStore";
import {ib} from "../../utils/fontStyles";
import {exercisesList} from "../../utils/testdb";
import {IExerciseTask} from "../../../store/useExerciseStore/types";

const ExerciseScreen = ({navigation}) => {
    const { currentCategory } = useCategoryStore();
    const { currentTask, setCurrentExercise, setCurrentTask, enqueueTask, startTimer, dequeueTask, setTime, taskQueue } = useExerciseStore();
    const [taskIndex, setTaskIndex] = useState(0)

    useEffect(() => {
        startExercise();
    }, []);

    const startExercise = async () => {
        const exercise = exercisesList?.filter(x => x?.categoryId === currentCategory?.id)?.sort(() => 0.5 - Math.random())[0];
        setCurrentExercise(exercise);

        for (const task of exercise.tasks) {
            console.log(task)
            await enqueueTask(task);
        }

        // Check if taskQueue is not empty before starting the task
        if (taskQueue.length > 0) {
            startTask();
        } else {
            console.log('No tasks in the queue');
            // Handle this case as needed
        }
    };

    const startTask = () => {
        const task = taskQueue[taskIndex];
        if (task) {
            setCurrentTask(task);
            setTime(task.timeInSec);
            startTimer(
                () => {
                    // Do something during each tick if needed
                },
                () => {
                    dequeueTask();
                    setTaskIndex((prev) => prev + 1)
                }
            );
        } else {
            // All tasks are completed, perform final actions here
            console.log('completed')
            navigation.navigate('Home');
        }
    };

    useEffect(() => {
        console.log(taskIndex)
        if (taskIndex !== 0) {
            startTask()
        }
    }, [taskIndex]);

    return (
        <ExerciseLayout onPressBtn={() => {}} title={currentCategory?.name} onClose={() => {navigation.navigate("Home")}} btnText={"Начать"}>
            <Text style={ib} className={'text-xl'}>{currentTask?.name}</Text>
        </ExerciseLayout>
    );
};

export default ExerciseScreen
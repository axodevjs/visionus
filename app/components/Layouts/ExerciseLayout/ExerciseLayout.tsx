import React, {FC, ReactNode} from 'react';
import {Text, View} from "react-native";
import Header from "../../ui/Header/Header";
import Button from "../../ui/Button/Button";
import useExerciseStore from "../../../../store/useExerciseStore/useExerciseStore";
import {im} from "../../../utils/fontStyles";

interface IExerciseLayout {
    title: string
    onClose: () => void
    children: ReactNode
    btnText: string
    onPressBtn: () => void
}

const ExerciseLayout: FC<IExerciseLayout> = (props) => {
    const {currentExercise, time} = useExerciseStore()

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        // Use padStart to add leading zeros if needed
        const formattedTime = `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;

        return formattedTime;
    };

    return (
        <View className={'w-full h-full pt-6 pb-8 px-8 bg-white flex flex-col items-center justify-between'}>
            <Header text={props.title} onClose={props.onClose}/>
            {props.children}

            {currentExercise ?
                <Text style={im} className={'text-2xl text-blue-600'}>{formatTime(time)}</Text>
                :
                <Button type={'blue'} onPress={props.onPressBtn} text={'Начать'}/>
            }
        </View>
    );
};

export default ExerciseLayout;
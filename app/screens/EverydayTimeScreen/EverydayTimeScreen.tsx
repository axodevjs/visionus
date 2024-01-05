import React, {useState} from 'react';
import {Text, View} from "react-native";
import MainLayout from "../../components/Layouts/MainLayout";
import QuizLayout from "../../components/Layouts/QuizLayout";
import SelectButton from "../../components/ui/SelectButton/SelectButton";

const EverydayTimeScreen = ({navigation}) => {
    const [selectedTime, setSelectedTime] = useState('10 мин')

    const onPressNext = () => {
        navigation.navigate('HomeScreen')
    }

    const handleSelect = (time: string) => {
        setSelectedTime(time)
    }

    return (
        <QuizLayout onPressBtn={onPressNext} btnText={'Готово'} title={'Сколько ежедневно вы готовы уделять упражнениям?'}>
            <View className={'flex flex-row w-full justify-center'} style={{gap: 24}}>
                <SelectButton active={selectedTime === '5 мин'} text={'5 мин'} onPress={() => {handleSelect('5 мин')}}/>
                <SelectButton active={selectedTime === '10 мин'} text={'10 мин'} onPress={() => {handleSelect('10 мин')}}/>
                <SelectButton active={selectedTime === '15 мин'} text={'15 мин'} onPress={() => {handleSelect('15 мин')}}/>
            </View>
        </QuizLayout>
    );
};

export default EverydayTimeScreen;
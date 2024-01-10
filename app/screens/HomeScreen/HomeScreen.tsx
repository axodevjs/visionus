import React, {useState} from 'react';
import MainLayout from "../../components/Layouts/MainLayout";
import {Text, View} from "react-native";
import ProgressCircle from "../../components/ProgressCircle/ProgressCircle";
import RateYourStatus from "../../components/RateYourStatus/RateYourStatus";
import StatusStatistic from "../../components/StatusStatistic/StatusStatistic";
import {ScrollView} from "react-native-gesture-handler";
import TimeStatistic from "../../components/TimeStatistic/TimeStatistic";

const HomeScreen = () => {
    const [fill, setFill] = useState(65)

    return (
        <MainLayout onPressBtn={() => {}} btnText={'Начать тренировку'}>
            <ScrollView className={"w-full"} showsVerticalScrollIndicator={false}>
                <View className={'w-full flex flex-col items-center pb-7'}>
                    <ProgressCircle
                        type={'big'}
                        fill={fill}
                    />
                    <RateYourStatus/>
                    <StatusStatistic/>
                    <TimeStatistic/>
                </View>
            </ScrollView>

        </MainLayout>
    );
};

export default HomeScreen;
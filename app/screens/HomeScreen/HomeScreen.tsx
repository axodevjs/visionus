import React from 'react';
import MainLayout from "../../components/Layouts/MainLayout";
import {Text} from "react-native";

const HomeScreen = () => {
    return (
        <MainLayout onPressBtn={() => {}} btnText={'Начать тренировку'}>
            <Text>123</Text>
        </MainLayout>
    );
};

export default HomeScreen;
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import React, {useEffect, useState} from 'react'
import AgeScreen from '../screens/AgeScreen/AgeScreen'
import StartScreen from '../screens/StartScreen/StartScreen'
import EyesStatusScreen from "../screens/EyesStatusScreen/EyesStatusScreen";
import EverydayTimeScreen from "../screens/EverydayTimeScreen/EverydayTimeScreen";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import {useAuth} from "../hooks/useAuth";
import useModalStore from "../../store/useModalStore/useModalStore";
import {IModal, IModalStore, ModalNameType} from "../../store/useModalStore/types";
import RateOutAppModal from "../components/Modals/RateOutAppModal/RateOutAppModal";
import SelectCategoryModal from "../components/Modals/SelectCategoryModal/SelectCategoryModal";
import FeedbackModal from "../components/Modals/FeedbackModal/FeedbackModal";

const Stack = createStackNavigator()

const MainNavigator = ({navigation}) => {
    const {user} = useAuth()
    const {modals, closeModal, openModal} = useModalStore()

    const getModalComponent = (modalName: ModalNameType) => {
        switch (modalName) {
            case "RateOurApp":
                return RateOutAppModal

            case "Feedback":
                return FeedbackModal

            case "SelectCategory":
                return SelectCategoryModal
        }
    }

    const renderScreens = () => {
        if (user) {
            return (
                <>
                    <Stack.Screen name="Age" component={AgeScreen} />
                    <Stack.Screen name="EyesStatus" component={EyesStatusScreen} />
                    <Stack.Screen name="EverydayTime" component={EverydayTimeScreen} />
                    <Stack.Screen name="Home" component={HomeScreen} />
                </>
            );
        } else {
            return <Stack.Screen name="Start" component={StartScreen} />;
        }
    };

    const renderModals = () => {
        return Object.entries(modals).map(([modalName, modal]) => {
            const ModalComponent = getModalComponent(modalName as ModalNameType);
            if (ModalComponent) {
                return (
                    <ModalComponent
                        key={modalName}
                        visible={modal.isVisible}
                        onClose={() => closeModal(modalName as ModalNameType)}
                    />
                );
            }
            return null;
        });
    };

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                {renderScreens()}
            </Stack.Navigator>

            {renderModals()}
        </NavigationContainer>
    )
}

export default MainNavigator

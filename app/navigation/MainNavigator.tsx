import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AgeScreen from '../screens/AgeScreen/AgeScreen';
import StartScreen from '../screens/StartScreen/StartScreen';
import EyesStatusScreen from '../screens/EyesStatusScreen/EyesStatusScreen';
import EverydayTimeScreen from '../screens/EverydayTimeScreen/EverydayTimeScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import {useAuth} from '../hooks/useAuth';
import useModalStore from '../../store/useModalStore/useModalStore';
import {ModalNameType} from '../../store/useModalStore/types';
import RateOutAppModal from '../components/Modals/RateOutAppModal/RateOutAppModal';
import FeedbackModal from '../components/Modals/FeedbackModal/FeedbackModal';
import CategoryScreen from '../screens/CategoryScreen/CategoryScreen';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {TOKEN_KEY} from "../hooks/useGoogleSignIn";
import ExerciseScreen from "../screens/ExerciseScreen/ExerciseScreen";

const Stack = createStackNavigator();

const MainNavigator = () => {
    const {user, userFirestore} = useAuth();
    const {modals, closeModal, openModal} = useModalStore();

    const getModalComponent = (modalName: ModalNameType) => {
        switch (modalName) {
            case 'RateOurApp':
                return RateOutAppModal;

            case 'Feedback':
                return FeedbackModal;
        }
    };

    const renderScreens = () => {
        if (!userFirestore) {
            return <Stack.Screen name="Start" component={StartScreen}/>;
        } else {
            return (
                <>
                    {userFirestore?.age ? (<>
                        <Stack.Screen name="Home" component={HomeScreen}/>
                        <Stack.Screen name="Category" component={CategoryScreen}/>
                        <Stack.Screen name="Exercise" component={ExerciseScreen}/>
                    </>) : (
                        <>
                            <Stack.Screen name="Age" component={AgeScreen}/>
                            <Stack.Screen name="EyesStatus" component={EyesStatusScreen}/>
                            <Stack.Screen name="EverydayTime" component={EverydayTimeScreen}/>
                        </>
                    )}
                </>
            );
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
    );
};

export default MainNavigator;

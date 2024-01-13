import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import React, {useEffect, useState} from 'react'
import AgeScreen from '../screens/AgeScreen/AgeScreen'
import StartScreen from '../screens/StartScreen/StartScreen'
import EyesStatusScreen from "../screens/EyesStatusScreen/EyesStatusScreen";
import EverydayTimeScreen from "../screens/EverydayTimeScreen/EverydayTimeScreen";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import {useAuth} from "../hooks/useAuth";

const Stack = createStackNavigator()

const MainNavigator = ({navigation}) => {
    const {user} = useAuth()

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                {
                    user ?
                        (
                            <>
                                <Stack.Screen name='Age' component={AgeScreen}/>
                                <Stack.Screen name='EyesStatus' component={EyesStatusScreen}/>
                                <Stack.Screen name='EverydayTime' component={EverydayTimeScreen}/>
                                <Stack.Screen name='Home' component={HomeScreen}/>
                            </>
                        ) :
                        (
                            <>
                                <Stack.Screen name='Start' component={StartScreen}/>
                            </>
                        )
                }


            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainNavigator

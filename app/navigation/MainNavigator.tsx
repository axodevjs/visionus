import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import AgeScreen from '../screens/AgeScreen/AgeScreen'
import StartScreen from '../screens/StartScreen/StartScreen'
import EyesStatusScreen from "../screens/EyesStatusScreen/EyesStatusScreen";
import EverydayTimeScreen from "../screens/EverydayTimeScreen/EverydayTimeScreen";
import HomeScreen from "../screens/HomeScreen/HomeScreen";

const Stack = createStackNavigator()

const MainNavigator = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					headerShown: false,
				}}
			>
				<Stack.Screen name='Start' component={StartScreen} />
				<Stack.Screen name='Age' component={AgeScreen} />
				<Stack.Screen name='EyesStatus' component={EyesStatusScreen} />
				<Stack.Screen name='EverydayTime' component={EverydayTimeScreen} />

				<Stack.Screen name='Home' component={HomeScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}

export default MainNavigator

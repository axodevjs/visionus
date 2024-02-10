import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import useUser from '../hooks/useUser'
import AgeScreen from '../screens/AgeScreen/AgeScreen'
import CategoryScreen from '../screens/CategoryScreen/CategoryScreen'
import EverydayTimeScreen from '../screens/EverydayTimeScreen/EverydayTimeScreen'
import ExerciseScreen from '../screens/ExerciseScreen/ExerciseScreen'
import EyesStatusScreen from '../screens/EyesStatusScreen/EyesStatusScreen'
import FinishExerciseScreen from '../screens/FinishExerciseScreen/FinishExerciseScreen'
import HomeScreen from '../screens/HomeScreen/HomeScreen'
import StartScreen from '../screens/StartScreen/StartScreen'
import Modals from './Modals'

const Stack = createStackNavigator()

const MainNavigator = () => {
	const { user, loading } = useUser()

	if (loading) return null

	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					headerShown: false,
				}}
			>
				{user ? (
					<>
						<Stack.Screen name='Home' component={HomeScreen} />
						<Stack.Screen name='Category' component={CategoryScreen} />
						<Stack.Screen name='Exercise' component={ExerciseScreen} />
						<Stack.Screen
							name='FinishExercise'
							component={FinishExerciseScreen}
						/>

						{/* questions screens */}
						<Stack.Screen name='Age' component={AgeScreen} />
						<Stack.Screen name='EverydayTime' component={EverydayTimeScreen} />
						<Stack.Screen name='EyesStatus' component={EyesStatusScreen} />
					</>
				) : (
					<Stack.Screen name='Start' component={StartScreen} />
				)}
			</Stack.Navigator>
			<Modals />
		</NavigationContainer>
	)
}

export default MainNavigator

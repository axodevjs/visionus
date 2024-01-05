import { useFonts } from 'expo-font'
import { NativeWindStyleSheet } from 'nativewind'
import MainNavigator from './app/navigation/MainNavigator'

// Установка стилей по умолчанию
NativeWindStyleSheet.setOutput({
	default: 'native',
})

let customFonts = {
	ibl: require('./assets/fonts/Inter/Inter-Black.ttf'),
	ib: require('./assets/fonts/Inter/Inter-Bold.ttf'),
	is: require('./assets/fonts/Inter/Inter-SemiBold.ttf'),
	im: require('./assets/fonts/Inter/Inter-Medium.ttf'),
	ir: require('./assets/fonts/Inter/Inter-Regular.ttf'),
}

export default function App() {
	const [fontsLoaded] = useFonts(customFonts)

	if (!fontsLoaded) {
		return null
	}

	return <MainNavigator />
}

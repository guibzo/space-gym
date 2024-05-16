import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto'
import { StatusBar, Text, View } from 'react-native'
import './global.css'

export default function App() {
  const [areFontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })

  if (!areFontsLoaded) {
    return <View />
  }

  return (
    <View className='flex-1 items-center justify-center bg-[#202024]'>
      <StatusBar
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />

      <Text>Hello World</Text>
    </View>
  )
}

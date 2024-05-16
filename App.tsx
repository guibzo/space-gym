import { DefaultLayout } from '@/components/layouts/default'
import { LoadingIndicator } from '@/components/loading-indicator'
import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto'
import { H3 } from '@expo/html-elements'
import { PaperProvider } from 'react-native-paper'
import './global.css'

export default function App() {
  const [areFontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })

  if (!areFontsLoaded) {
    return <LoadingIndicator />
  }

  return (
    <PaperProvider>
      <DefaultLayout>
        <H3 className='text-neutral-100'>Hello World</H3>
      </DefaultLayout>
    </PaperProvider>
  )
}

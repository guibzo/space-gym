import { DefaultLayout } from '@/components/layouts/default'
import { LoadingIndicator } from '@/components/loading-indicator'
import { SignUp } from '@/screens/sign-up'
import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto'
import './global.css'

export default function App() {
  const [areFontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })

  if (!areFontsLoaded) {
    return (
      <DefaultLayout>
        <LoadingIndicator />
      </DefaultLayout>
    )
  }

  return <SignUp />
}

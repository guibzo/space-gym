import { DefaultLayout } from '@/components/layouts/default'
import { LoadingIndicator } from '@/components/loading-indicator'
import { SignIn } from '@/screens/sign-in'
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

  return <SignIn />
}

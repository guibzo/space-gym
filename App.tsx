import { AuthContextProvider } from '@/contexts/auth-context'
import { Router } from '@/routes/router'
import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto'

import { LoadingIndicatorScreen } from '@/components/loading-indicator-screen'
import { useAuth } from '@/hooks/use-auth'
import './global.css'

export default function App() {
  const [areFontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })
  const { isLoadingUserStorageData } = useAuth()

  if (!areFontsLoaded || isLoadingUserStorageData) {
    return <LoadingIndicatorScreen />
  }

  return (
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  )
}

import { AppLayout } from '@/components/layouts/app'
import { LoadingIndicator } from '@/components/loading-indicator'
import { AuthContextProvider } from '@/contexts/auth-context'
import { Router } from '@/routes/router'
import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto'
import './global.css'

export default function App() {
  const [areFontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })

  if (!areFontsLoaded) {
    return (
      <AppLayout>
        <LoadingIndicator />
      </AppLayout>
    )
  }

  return (
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  )
}

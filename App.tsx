import { AppLayout } from '@/components/layouts/app'
import { AuthContextProvider } from '@/contexts/auth-context'
import { Router } from '@/routes/router'
import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto'
import { Div } from '@expo/html-elements'

import { LoadingIndicator } from '@/components/loading-indicator'
import { useAuth } from '@/hooks/use-auth'
import './global.css'

export default function App() {
  const [areFontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })
  const { isLoadingUserStorageData } = useAuth()

  if (!areFontsLoaded || isLoadingUserStorageData) {
    return (
      <AppLayout>
        <Div className='flex-1 justify-center items-center'>
          <LoadingIndicator />
        </Div>
      </AppLayout>
    )
  }

  return (
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  )
}

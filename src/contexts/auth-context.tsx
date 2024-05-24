import type { User } from '@/@types/user'
import { api } from '@/lib/axios'
import { getUserOnStorage, saveUserOnStorage } from '@/local-storage/user-storage'
import type { SignInSchema } from '@/screens/sign-in/sign-in-schema'
import { createContext, useEffect, useState, type ReactNode } from 'react'
import { Alert } from 'react-native'

type AuthContextType = {
  userData: User | null
  setUserData: (user: User | null) => void
  setIsLoadingUserStorageData: (isLoading: boolean) => void
  isLoadingUserStorageData: boolean
  signIn: ({ email, password }: SignInSchema) => void
  isAuthenticating: boolean
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<User | null>(null)

  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true)
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  const signIn = async ({ email, password }: SignInSchema) => {
    try {
      setIsAuthenticating(true)

      const { data: signInResponse } = await api.post('/sessions', {
        email,
        password,
      })

      if (signInResponse.user) {
        setUserData(signInResponse.user)
        saveUserOnStorage(signInResponse.user)
      }
    } catch (error: any) {
      Alert.alert(
        error.response.data.message ??
          'Não foi possível acessar sua conta. Tente novamente mais tarde.'
      )
      // TO-DO: Add toast
    } finally {
      setIsAuthenticating(false)
    }
  }

  useEffect(() => {
    const loadExistingUserData = async () => {
      const userDataOnStorage = await getUserOnStorage()

      if (userDataOnStorage) {
        setUserData(userDataOnStorage)
      }

      setIsLoadingUserStorageData(false)
    }

    loadExistingUserData()
  }, [])

  const contextValue = {
    userData,
    setUserData,
    isLoadingUserStorageData,
    setIsLoadingUserStorageData,
    signIn,
    isAuthenticating,
  }

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

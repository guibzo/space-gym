import type { User } from '@/@types/user'
import { api } from '@/lib/axios'
import { getAuthTokenOnStorage, saveAuthTokenOnStorage } from '@/local-storage/auth-token-storage'
import { getUserOnStorage, saveUserOnStorage } from '@/local-storage/user-storage'
import type { SignInSchema } from '@/screens/sign-in/sign-in-schema'
import { createContext, useEffect, useState, type ReactNode } from 'react'
import { Alert } from 'react-native'

type AuthContextType = {
  userData: User | null
  setUserData: (user: User | null) => void
  setIsLoadingUserStorageData: (isLoading: boolean) => void
  isLoadingUserStorageData: boolean
  signIn: ({ email, password }: SignInSchema) => Promise<void>
  isAuthenticating: boolean
  updateUserProfile: (updatedUser: User) => Promise<void>
}

type SignInResponse = {
  token: string
  user: User
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<User | null>(null)

  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true)
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  const signIn = async ({ email, password }: SignInSchema) => {
    try {
      setIsAuthenticating(true)

      const { data: signInResponse } = await api.post<SignInResponse>('/sessions', {
        email,
        password,
      })

      if (signInResponse.user && signInResponse.token) {
        setUserData(signInResponse.user)
        await saveUserOnStorage(signInResponse.user)

        saveAuthTokenOnStorage(signInResponse.token)
        api.defaults.headers.common['Authorization'] = `Bearer ${signInResponse.token}`
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

  const updateUserProfile = async (updatedUserData: User) => {
    setUserData(updatedUserData)
    await saveUserOnStorage(updatedUserData)
  }

  useEffect(() => {
    const loadExistingUserData = async () => {
      const userDataOnStorage = await getUserOnStorage()
      const authTokenOnStorage = await getAuthTokenOnStorage()

      if (authTokenOnStorage && userDataOnStorage) {
        setUserData(userDataOnStorage)
        api.defaults.headers.common['Authorization'] = `Bearer ${authTokenOnStorage}`
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
    updateUserProfile,
  }

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

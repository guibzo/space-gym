import type { User } from '@/@types/user'
import { getUserOnStorage } from '@/local-storage/user-storage'
import { createContext, useEffect, useState, type ReactNode } from 'react'

type AuthContextType = {
  userData: User | null
  setUserData: (user: User | null) => void
  setIsLoadingUserStorageData: (isLoading: boolean) => void
  isLoadingUserStorageData: boolean
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<User | null>(null)
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true)

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
  }

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

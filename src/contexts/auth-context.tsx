import type { User } from '@/@types/user'
import { createContext, useState, type ReactNode } from 'react'

type AuthContextType = {
  userData: User | null
  setUserData: (user: User) => void
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<User | null>(null)

  const contextValue = {
    userData,
    setUserData,
  }

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

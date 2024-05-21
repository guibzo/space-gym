import type { User } from '@/@types/user'
import { createContext, useState, type ReactNode } from 'react'

type AuthContextType = {
  userData: User
  setUserData: (user: User) => void
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<User>({
    id: '1',
    name: 'John Doe',
    email: 'example@email.com',
    avatar: 'https://github.com/xbozo.png',
  })

  const contextValue = {
    userData,
    setUserData,
  }

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

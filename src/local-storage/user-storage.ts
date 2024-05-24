import type { User } from '@/@types/user'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { USER_STORAGE_KEY } from './storage-config'

export const saveUserOnStorage = async (user: User) => {
  await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
}

export const getUserOnStorage = async () => {
  const userOnStorage = await AsyncStorage.getItem(USER_STORAGE_KEY)

  const userData: User = userOnStorage ? JSON.parse(userOnStorage) : null

  return userData
}

export const removeUserOnStorage = async () => {
  await AsyncStorage.removeItem(USER_STORAGE_KEY)
}

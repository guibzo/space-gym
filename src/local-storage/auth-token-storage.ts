import { AUTH_TOKEN_STORAGE_KEY } from '@/local-storage/storage-config'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const saveAuthTokenOnStorage = async (token: string) => {
  await AsyncStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token)
}

export const getAuthTokenOnStorage = async () => {
  const token = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE_KEY)

  return token
}

export const removeAuthTokenOnStorage = async () => {
  await AsyncStorage.removeItem(AUTH_TOKEN_STORAGE_KEY)
}

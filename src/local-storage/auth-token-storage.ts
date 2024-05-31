import { AUTH_TOKEN_STORAGE_KEY } from '@/local-storage/storage-config'
import AsyncStorage from '@react-native-async-storage/async-storage'

type Tokens = {
  token: string
  refreshToken: string
}

export const saveAuthTokenOnStorage = async ({ token, refreshToken }: Tokens) => {
  await AsyncStorage.setItem(AUTH_TOKEN_STORAGE_KEY, JSON.stringify({ token, refreshToken }))
}

export const getAuthTokenOnStorage = async () => {
  const existingTokensResponse = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE_KEY)

  const { refreshToken, token }: Tokens = existingTokensResponse
    ? JSON.parse(existingTokensResponse)
    : {}

  return { token, refreshToken }
}

export const removeAuthTokenOnStorage = async () => {
  await AsyncStorage.removeItem(AUTH_TOKEN_STORAGE_KEY)
}

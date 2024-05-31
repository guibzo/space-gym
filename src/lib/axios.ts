import { getAuthTokenOnStorage, saveAuthTokenOnStorage } from '@/local-storage/auth-token-storage'
import { AppError } from '@/utils/app-error'
import axios, { type AxiosError, type AxiosInstance } from 'axios'

interface APIInstanceProps extends AxiosInstance {
  registerInterceptTokenManager: (signOut: () => void) => () => void
}

type PromiseOnQueue = {
  onSuccess: (token: string) => void
  onFailure: (error: AxiosError) => void
}

export const api = axios.create({
  baseURL: 'http://172.17.192.1:3333',
}) as APIInstanceProps

let failedRequestsQueue: PromiseOnQueue[] = []
let isRefreshingJWT = false

api.registerInterceptTokenManager = (singOut) => {
  const interceptTokenManager = api.interceptors.response.use(
    (response) => response,
    async (requestError) => {
      if (requestError.response?.status === 401) {
        if (
          requestError.response.data?.message === 'token.expired' ||
          requestError.response.data?.message === 'token.invalid'
        ) {
          const { refreshToken } = await getAuthTokenOnStorage()

          if (!refreshToken) {
            singOut()
            return Promise.reject(requestError)
          }

          const originalRequestConfig = requestError.config

          if (isRefreshingJWT) {
            return new Promise((resolve, reject) => {
              failedRequestsQueue.push({
                onSuccess: (token: string) => {
                  originalRequestConfig.headers['Authorization'] = `Bearer ${token}`

                  resolve(api(originalRequestConfig))
                },
                onFailure: (error: AxiosError) => {
                  reject(error)
                },
              })
            })
          }

          isRefreshingJWT = true

          return new Promise(async (resolve, reject) => {
            try {
              const { data: refreshTokenResponse } = await api.post('/sessions/refresh-token', {
                refresh_token: refreshToken,
              })

              await saveAuthTokenOnStorage({
                token: refreshTokenResponse.token,
                refreshToken: refreshTokenResponse.refresh_token,
              })

              if (originalRequestConfig.data) {
                originalRequestConfig.data = JSON.parse(originalRequestConfig.data)
              }

              originalRequestConfig.headers[
                'Authorization'
              ] = `Bearer ${refreshTokenResponse.token}`

              api.defaults.headers.common['Authorization'] = `Bearer ${refreshTokenResponse.token}`

              failedRequestsQueue.forEach((request) => {
                request.onSuccess(refreshTokenResponse.token)
              })

              resolve(api(originalRequestConfig))
            } catch (error: any) {
              failedRequestsQueue.forEach((request) => {
                request.onFailure(error)
              })

              singOut()
              reject(error)
            } finally {
              isRefreshingJWT = false
              failedRequestsQueue = []
            }
          })
        }
      }

      if (requestError.response && requestError.response.data) {
        return Promise.reject(new AppError(requestError.response.data.message))
      }

      return Promise.reject(requestError)
    }
  )

  return () => {
    api.interceptors.response.eject(interceptTokenManager)
  }
}

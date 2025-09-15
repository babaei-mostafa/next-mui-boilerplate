import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'
import { clearAuth, getAccessToken, setAccessToken } from './authService'

export interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  skipAuth?: boolean
  _retry?: boolean
}

interface RefreshResponse {
  accessToken: string
}

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
})

apiClient.interceptors.request.use((config: CustomAxiosRequestConfig) => {
  const token = getAccessToken()

  if (!config.skipAuth && token) {
    config.headers = config.headers ?? {}
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true

      try {
        const { data } = await axios.post<RefreshResponse>(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        )

        setAccessToken(data.accessToken)

        // retry original request with new token
        if (!originalRequest.skipAuth) {
          originalRequest.headers = originalRequest.headers ?? {}
          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`
        }

        return apiClient(originalRequest)
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError)
        clearAuth()
        return Promise.reject(new Error('UNAUTHENTICATED'))
      }
    }

    return Promise.reject(error)
  }
)

export default apiClient

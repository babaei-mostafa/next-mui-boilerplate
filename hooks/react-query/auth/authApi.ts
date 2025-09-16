import apiClient from '@/lib/api/apiClient'
import { LoginReq } from '@/types/auth'

export const login = async (body: LoginReq): Promise<unknown> => {
  const url = `/api/auth/login`
  const { data } = await apiClient.post(url, body, { skipAuth: false })
  return data
}

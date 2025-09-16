import { LoginReq } from '@/types/auth'
import { MutationOptions, useMutation } from '@tanstack/react-query'
import { login } from './authApi'
import { AxiosError } from 'axios'

export const useLoginMutation = (
  options?: MutationOptions<unknown, AxiosError, LoginReq>
) => {
  const mutationKey = [`/api/auth/login`]
  return useMutation<unknown, AxiosError, LoginReq>({
    mutationKey,
    mutationFn: (body: LoginReq) => login(body),
    ...options,
  })
}

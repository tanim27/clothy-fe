import axiosRequest from '@/utils/axiosRequest'
import { useMutation } from '@tanstack/react-query'

export const useUserRegister = () => {
	return useMutation({
		mutationKey: 'register',
		mutationFn: async (body) =>
			await axiosRequest({
				url: '/api/auth/register',
				method: 'POST',
				data: body,
			}),
	})
}

export const useUserLogin = () => {
	return useMutation({
		mutationKey: 'login',
		mutationFn: async (body) =>
			await axiosRequest({
				url: '/api/auth/login',
				method: 'POST',
				data: body,
			}),
	})
}

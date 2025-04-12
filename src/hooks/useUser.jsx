// import axiosRequest from '@/utils/axiosRequest'
// import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

// // Fetch user by ID
// export const useGetUserById = (id) => {
// 	return useQuery({
// 		queryKey: ['user', id],
// 		queryFn: async () =>
// 			await axiosRequest({
// 				url: `/api/user/${id}`,
// 				method: 'GET',
// 				// headers: {
// 				// 	Authorization: `Bearer ${token}`,
// 				// },
// 			}),
// 		enabled: !!id,
// 	})
// }

// // Update user by ID
// export const useUpdateUserById = () => {
// 	const queryClient = useQueryClient()

// 	return useMutation({
// 		mutationFn: async ({ id, userData }) =>
// 			await axiosRequest({
// 				url: `/api/users/${id}`,
// 				method: 'PUT',
// 				data: userData,
// 			}),
// 		onSuccess: (data, { id }) => {
// 			queryClient.invalidateQueries(['user', id])
// 		},
// 	})
// }

// export const useResetPassword = () => {
// 	return useMutation({
// 		mutationFn: async (data) => {
// 			return await axiosRequest({
// 				method: 'PUT',
// 				url: '/user/reset-password',
// 				data,
// 			})
// 		},
// 	})
// }

'use client'

import axiosRequest from '@/utils/axiosRequest'
import { useMutation } from '@tanstack/react-query'

// Hook for requesting a reset link
export const useForgetPassword = () => {
	return useMutation({
		mutationFn: (data) =>
			axiosRequest({
				method: 'POST',
				url: '/api/auth/forget-password',
				data,
			}),
	})
}

// Hook for resetting password with token
export const useResetPassword = (token) => {
	return useMutation({
		mutationFn: (data) =>
			axiosRequest({
				method: 'POST',
				url: `/api/auth/reset-password/${token}`,
				data,
			}),
	})
}

// Hook for changing password
export const useChangePassword = (token) => {
	return useMutation({
		mutationFn: (data) =>
			axiosRequest({
				method: 'POST',
				url: `/api/auth/change-password`,
				data,
			}),
	})
}

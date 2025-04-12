import axiosRequest from '@/utils/axiosRequest'
import { useMutation, useQuery } from '@tanstack/react-query'

export const useCreateOrder = () => {
	return useMutation({
		mutationKey: ['create-order'],
		mutationFn: async (orderData) => {
			const response = await axiosRequest({
				method: 'POST',
				url: '/api/orders',
				data: orderData,
			})
			return response
		},
	})
}

export const useTrackOrder = (orderID, phoneNumber) => {
	return useQuery({
		queryKey: ['track-order', orderID, phoneNumber], // Re-fetch when orderID or phoneNumber change
		queryFn: async () => {
			if (!orderID || !phoneNumber) return null
			return await axiosRequest({
				method: 'GET',
				url: `/api/orders/track-order?order_id=${orderID}&phone_number=${phoneNumber}`,
			})
		},
		enabled: !!orderID && !!phoneNumber, // Only fetch when both values are available
	})
}

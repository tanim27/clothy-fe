import axiosRequest from '@/utils/axiosRequest' // Adjust the path as needed
import { useQuery } from '@tanstack/react-query'

export const useGetProducts = () => {
	return useQuery({
		queryKey: ['products'], // Unique cache key for React Query
		queryFn: async () =>
			await axiosRequest({
				url: `/api/products`, // Adjust this URL based on your backend API
				method: 'GET',
			}),
	})
}

export const useGetProductById = (id) => {
	return useQuery({
		queryKey: ['product', id], // Cache key includes product ID
		queryFn: async () =>
			await axiosRequest({
				url: `/api/products/${id}`, // Adjust the endpoint based on your backend API
				method: 'GET',
			}),
		enabled: !!id, // Prevent the query from running if `id` is undefined
	})
}

export const useGetProductByCategory = (category) => {
	return useQuery({
		queryKey: ['product', category], // Cache key includes product ID
		queryFn: async () =>
			await axiosRequest({
				url: `/api/products?category=${category}`, // Adjust the endpoint based on your backend API
				method: 'GET',
			}),
		enabled: !!id, // Prevent the query from running if `id` is undefined
	})
}

const useSearchProducts = (query, enabled = true) =>
	useQuery({
		queryKey: ['search', query],
		queryFn: async () =>
			await axiosRequest({
				url: `/api/search?query=${encodeURIComponent(query)}`,
				method: 'GET',
			}),
		enabled: enabled && !!query,
		retry: false,
	})

export default useSearchProducts

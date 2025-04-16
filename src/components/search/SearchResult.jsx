'use client'

import ProductCard from '@/components/products/ProductCard'
import useSearchProducts from '@/hooks/useProduct'
import { CircularProgress } from '@mui/material'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

const SearchResult = () => {
	const searchParams = useSearchParams()
	const query = searchParams.get('query') || ''

	const { data, isLoading, error } = useSearchProducts(query, !!query)
	const products = data?.products || []

	if (isLoading) {
		return (
			<div className='h-screen flex justify-center items-center'>
				<CircularProgress color='default' />
			</div>
		)
	}

	if (error) {
		return (
			<p className='text-red-500'>
				{typeof error === 'string'
					? error
					: error.message || 'Something went wrong'}
			</p>
		)
	}

	return (
		<div className='min-h-screen p-4'>
			<div className='flex items-center space-x-2 font-bold text-[#1a1a1d] text-lg uppercase border-b-2 border-gray-200 px-4 py-2'>
				<span className='text-gray-600'>Home</span>
				<span className='text-gray-600'>|</span>
				<span className='text-gray-600'>Search</span>
				<span className='text-gray-600'>|</span>
				<span className=''>&quot;{query}&quot;</span>
			</div>

			<h2 className='font-semibold text-2xl text-start text-[#1F1F1F] px-4 py-2'>
				Showing result for:{' '}
				<span className='text-gray-600'>&quot;{query}&quot;</span>
			</h2>

			{!isLoading && products.length === 0 && (
				<div className='min-h-screen flex flex-col justify-center items-center gap-2'>
					<p className='font-extrabold text-[#1F1F1F] text-4xl'>
						No products found.
					</p>
					<Link href='/'>
						<button className='px-6 py-2 rounded-md text-lg font-medium cursor-pointer transition-colors border border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200'>
							Home
						</button>
					</Link>
				</div>
			)}

			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 px-4 py-2'>
				{products.map((product) => (
					<Link
						key={product?._id}
						href={`/products/${product?._id}`}
					>
						<ProductCard product={product} />
					</Link>
				))}
			</div>
		</div>
	)
}

export default SearchResult

'use client'

import ProductCard from '@/components/products/ProductCard'
import useSearchProducts from '@/hooks/useProduct'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

const SearchResult = () => {
	const searchParams = useSearchParams()
	const query = searchParams.get('query') || ''

	const { data, isLoading, error } = useSearchProducts(query, !!query)
	const products = data?.products || []

	return (
		<div className='min-h-screen px-4 md:px-16 py-12'>
			<h1 className='text-3xl font-bold mb-6'>
				Search Results for:{' '}
				<span className='text-blue-600'>&quot;{query}&quot;</span>
			</h1>

			{isLoading && <p>Loading...</p>}
			{error && (
				<p className='text-red-500'>
					{typeof error === 'string'
						? error
						: error.message || 'Something went wrong'}
				</p>
			)}
			{!isLoading && products.length === 0 && <p>No products found.</p>}

			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6'>
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

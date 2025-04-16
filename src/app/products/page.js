export const metadata = {
	title: 'Clothy | Products',
	description: 'Clothy application products page.',
}

import ProductList from '@/components/products/ProductList'
import { CircularProgress } from '@mui/material'
import { Suspense } from 'react'

const ProductListPage = () => {
	return (
		<Suspense
			fallback={
				<div>
					<CircularProgress color='default' />
				</div>
			}
		>
			<div className='min-h-screen'>
				<ProductList />
			</div>
		</Suspense>
	)
}

export default ProductListPage

import ProductList from '@/components/products/ProductList'
import { CircularProgress } from '@mui/material'
import { Suspense } from 'react'

const page = () => {
	return (
		<Suspense
			fallback={
				<div>
					<CircularProgress color='default' />
				</div>
			}
		>
			<div className='min-h-screen px-2 py-4'>
				<ProductList />
			</div>
		</Suspense>
	)
}

export default page

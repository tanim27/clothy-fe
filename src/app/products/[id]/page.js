'use client'

import ProductDetails from '@/components/products/ProductDetails'
import { useParams } from 'next/navigation'

const page = () => {
	const { id } = useParams

	return (
		<div className='min-h-screen'>
			<ProductDetails productId={id} />
		</div>
	)
}

export default page

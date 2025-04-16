export const metadata = {
	title: 'Clothy | Product Details',
	description: 'Clothy application product details page.',
}

import ProductDetails from '@/components/products/ProductDetails'

const ProductDetailsPage = () => {
	return (
		<div className='min-h-screen'>
			{/* <ProductDetails productId={id} /> */}
			<ProductDetails />
		</div>
	)
}

export default ProductDetailsPage

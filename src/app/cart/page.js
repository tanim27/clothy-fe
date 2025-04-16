export const metadata = {
	title: 'Clothy | Cart',
	description: 'Clothy application cart page.',
}

import CartList from '@/components/cart/CartList'

const CartPage = () => {
	return (
		<div className='min-h-screen'>
			<CartList />
		</div>
	)
}

export default CartPage

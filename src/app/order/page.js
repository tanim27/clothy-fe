export const metadata = {
	title: 'Clothy | Checkout',
	description: 'Clothy application checkout page.',
}

import OrderForm from '@/components/order/OrderForm'

const OrderPage = () => {
	return (
		<div className='flex justify-center items-center'>
			<OrderForm />
		</div>
	)
}

export default OrderPage

'use client'

import { useCartContext } from '@/providers/CartProvider'
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded'
import { IconButton } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const CartList = () => {
	const router = useRouter()
	const { cart, removeFromCart, updateQuantity, totalPrice, clearCart } =
		useCartContext()

	const handleQuantityChange = (productId, selectedSize, newQuantity) => {
		const item = cart.find(
			(item) => item._id === productId && item.selectedSize === selectedSize,
		)

		if (!item) return
		if (newQuantity < 1 || newQuantity > item.stock) return

		updateQuantity(productId, selectedSize, newQuantity)
	}

	const handleRemoveItem = (productId, selectedSize) => {
		removeFromCart(productId, selectedSize)
	}

	const handleProceedToCheckout = () => {
		router.push('/order')
	}

	if (cart.length === 0) {
		return (
			<div className='min-h-screen flex flex-col justify-center items-center gap-2'>
				<p className='font-extrabold text-[#1F1F1F] text-4xl'>
					Your cart is empty.
				</p>
				<Link href='/'>
					<button className='px-6 py-2 rounded-md text-lg font-medium cursor-pointer transition-colors border border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200'>
						Home
					</button>
				</Link>
			</div>
		)
	}

	return (
		<div className='max-w-screen-7xl mx-auto px-4 sm:px-6 py-6'>
			<h1 className='font-extrabold text-4xl text-center mb-6 text-[#1a1a1d]'>
				Cart
			</h1>

			<div className='hidden sm:grid grid-cols-12 gap-4 items-center border-b border-gray-200 text-center text-[#1a1a1d] font-semibold px-2 py-2'>
				<span className='col-span-6 text-left'>Product</span>
				<span className='col-span-3 text-center'>Quantity</span>
				<span className='col-span-2 text-center'>Price</span>
				<span className='col-span-1 text-center'>Remove</span>
			</div>

			<div className='flex flex-col'>
				{cart.map((item) => (
					<div
						key={item.cartKey}
						className='flex flex-col sm:grid sm:grid-cols-12 gap-4 items-center border-b border-gray-200 px-2 py-4'
					>
						<div className='flex flex-col sm:flex-row items-center gap-4 sm:gap-6 col-span-6'>
							<Image
								src={item.image}
								alt={item.name}
								width={80}
								height={80}
								className='object-cover w-20 h-20 shadow-lg'
							/>
							<div className='text-center sm:text-left'>
								<h3 className='font-semibold text-lg text-[#1a1a1d]'>
									{item.name}
								</h3>
								<p className='font-semibold text-sm text-gray-500'>
									Size: {item.selectedSize}
								</p>
							</div>
						</div>

						<div className='flex justify-center items-center gap-2 col-span-3'>
							<button
								onClick={() =>
									handleQuantityChange(
										item._id,
										item.selectedSize,
										item.quantity - 1,
									)
								}
								className='w-8 h-8 bg-gray-200 text-xl font-bold text-gray-700 rounded-md hover:bg-gray-300 cursor-pointer'
							>
								-
							</button>
							<input
								type='number'
								value={item.quantity}
								min='1'
								max={item.stock}
								onChange={(e) =>
									handleQuantityChange(
										item._id,
										item.selectedSize,
										Number(e.target.value),
									)
								}
								className='w-14 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black'
							/>
							<button
								onClick={() =>
									handleQuantityChange(
										item._id,
										item.selectedSize,
										item.quantity + 1,
									)
								}
								className='w-8 h-8 bg-gray-200 text-xl font-bold text-gray-700 rounded-md hover:bg-gray-300 cursor-pointer'
							>
								+
							</button>
						</div>

						<p className='text-lg font-semibold text-center col-span-2'>
							${(item.offer_price ?? item.price) * item.quantity}
						</p>

						<div className='flex justify-center col-span-1'>
							<IconButton
								size='large'
								color='error'
								onClick={() => handleRemoveItem(item._id, item.selectedSize)}
							>
								<DeleteOutlineRoundedIcon />
							</IconButton>
						</div>
					</div>
				))}
			</div>

			<div className='flex flex-col sm:flex-row justify-between items-center my-4 gap-2'>
				<div className='text-lg sm:text-xl font-semibold text-[#1a1a1d]'>
					Total: ${totalPrice}
				</div>
				<div className='flex flex-col sm:flex-row gap-2'>
					<button
						onClick={clearCart}
						className='px-6 py-2 rounded-md text-lg font-medium cursor-pointer transition-colors border border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200'
					>
						Clear Cart
					</button>
					<button
						onClick={handleProceedToCheckout}
						className='px-6 py-2 rounded-md text-lg font-medium cursor-pointer transition-colors border border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200'
					>
						Proceed to Checkout
					</button>
				</div>
			</div>
		</div>
	)
}

export default CartList

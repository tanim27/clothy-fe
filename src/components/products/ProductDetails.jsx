'use client'

import { useGetProductById } from '@/hooks/useProduct'
import { useCartContext } from '@/providers/CartProvider'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { CircularProgress } from '@mui/material'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import { useState } from 'react'

const ProductDetails = () => {
	const { id } = useParams()
	const { addToCart } = useCartContext()
	const { data: product, isLoading, isError } = useGetProductById(id)

	const [selectedSize, setSelectedSize] = useState('')
	const [quantity, setQuantity] = useState(1)

	if (isLoading)
		return (
			<div className='h-screen flex justify-center items-center'>
				<CircularProgress color='default' />
			</div>
		)

	if (isError || !product)
		return (
			<div className='flex items-center justify-center p-6'>
				<p className='text-center text-red-500 text-lg'>Product not found.</p>
				<Link
					href='/'
					className='mt-4 text-blue-600 underline'
				>
					Go Back
				</Link>
			</div>
		)

	// Get available sizes from stock
	const availableSizes = product?.stock.map((item) => item.size)

	// Set default size if not selected
	if (!selectedSize && availableSizes.length > 0) {
		setSelectedSize(availableSizes[0])
	}

	// Find stock quantity for selected size
	const selectedStock = product?.stock.find(
		(item) => item.size === selectedSize,
	)
	const availableQuantity = selectedStock ? selectedStock.quantity : 0

	const handleAddToCart = () => {
		if (quantity > availableQuantity) {
			alert('Not enough stock available!')
			return
		}

		addToCart({
			...product,
			selectedSize,
			quantity,
		})
		enqueueSnackbar(`Added ${quantity} ${product?.name} to cart!`, {
			variant: 'success',
		})
	}

	const incrementQuantity = () => {
		if (quantity < availableQuantity) setQuantity(quantity + 1)
	}

	const decrementQuantity = () => {
		if (quantity > 1) setQuantity(quantity - 1)
	}

	const handleAddToWishlist = () => {
		enqueueSnackbar(`Added ${product?.name} to wishlist!`, {
			variant: 'success',
		})
	}

	return (
		<div className='mx-auto px-8'>
			<div className='flex items-center space-x-2 font-bold text-[#1a1a1d] text-lg uppercase border-b-2 border-gray-200 py-2 mt-4'>
				<span className='text-gray-600 hover:underline cursor-pointer'>
					<Link href={'/'}>Home</Link>
				</span>
				<span className='text-gray-600'>|</span>
				<span className='text-gray-600 hover:underline cursor-pointer'>
					<Link href={'/products'}>Products</Link>
				</span>
				<span className='text-gray-600'>|</span>
				<span className=''>{product?.name}</span>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 gap-8 py-4 mb-4'>
				{/* Image Section */}
				<div className='relative w-full h-100 overflow-hidden shadow-none md:shadow-xl'>
					<img
						src={product?.image}
						alt={product?.name}
						className='object-cover transform transition-all duration-300 ease-in-out hover:scale-105'
					/>
				</div>

				{/* Product Details */}
				<div className='flex flex-col justify-between'>
					<h1 className='font-extrabold text-3xl text-[#1A1A1D] uppercase'>
						{product?.name}
					</h1>
					<p className='text-gray-600 text-justify mt-4'>
						{product?.description}
					</p>

					{/* Pricing Section */}
					<div className='mt-6'>
						{product?.offer_price ? (
							<div className='flex items-center space-x-4'>
								<p className='text-3xl font-extrabold text-[#1A1A1D]'>
									${product?.offer_price}
								</p>
								<p className='font-semibold text-xl text-red-600 line-through'>
									${product?.price}
								</p>
							</div>
						) : (
							<p className='font-extrabold text-3xl text-[#1A1A1D]'>
								${product?.price}
							</p>
						)}
					</div>

					{/* Size Selector */}
					<div className='mt-6'>
						<label className='block text-gray-700 font-semibold text-lg'>
							Size
						</label>
						<div className='flex gap-4 mt-2'>
							{availableSizes.map((size) => (
								<button
									key={size}
									onClick={() => setSelectedSize(size)}
									className={`px-6 py-2 rounded-md text-lg font-medium cursor-pointer transition-colors border border-gray-300 ${
										selectedSize === size
											? 'bg-black text-white'
											: 'bg-gray-100 text-gray-700 hover:bg-gray-200'
									}`}
								>
									{size}
								</button>
							))}
						</div>
					</div>

					{/* Stock Display */}
					<div className='mt-6'>
						<p className='text-lg font-medium text-gray-700'>
							{availableQuantity > 0
								? `In stock: ${availableQuantity}`
								: 'Out of stock'}
						</p>
					</div>

					{/* Quantity Control */}
					<div className='mt-6 flex items-center space-x-4'>
						<button
							onClick={decrementQuantity}
							className='w-10 h-10 flex items-center justify-center bg-gray-200 text-xl font-bold text-gray-700 rounded-md hover:bg-gray-300 cursor-pointer'
						>
							-
						</button>
						<input
							type='number'
							value={quantity}
							min='1'
							max={availableQuantity}
							onChange={(e) =>
								setQuantity(Math.min(e.target.value, availableQuantity))
							}
							className='w-16 p-2 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black'
						/>
						<button
							onClick={incrementQuantity}
							className='w-10 h-10 flex items-center justify-center bg-gray-200 text-xl font-bold text-gray-700 rounded-md hover:bg-gray-300 cursor-pointer'
						>
							+
						</button>
					</div>

					{/* Action Buttons */}
					<div className='mt-8 flex flex-col md:flex-row gap-4'>
						<button
							onClick={handleAddToCart}
							disabled={availableQuantity <= 0}
							className='w-full py-3 border border-gray-300 text-[#1A1A1D] text-lg font-semibold rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center gap-2 cursor-pointer'
						>
							<ShoppingCartIcon /> Add to Cart
						</button>
						<button
							onClick={handleAddToWishlist}
							className='w-full py-3 border border-gray-300 text-[#1A1A1D] text-lg font-semibold rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center gap-2 cursor-pointer'
						>
							<FavoriteIcon /> Add to Wishlist
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ProductDetails

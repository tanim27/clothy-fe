import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded'
import { IconButton } from '@mui/material'

const ProductCard = ({ product }) => {
	return (
		<div className='group rounded-md overflow-hidden transition-all transform cursor-pointer p-1'>
			<div className='relative w-full h-100  overflow-hidden'>
				<img
					height={300}
					width={300}
					src={product.image}
					alt={product.name}
					className='w-full h-full object-cover transition-opacity group-hover:opacity-50 duration-300'
				/>
				<div className='absolute inset-0 flex justify-center items-center'>
					<IconButton
						color='black'
						size='lg'
						className='opacity-0 transition-opacity group-hover:opacity-200 duration-300'
					>
						<RemoveRedEyeRoundedIcon />
					</IconButton>
				</div>
			</div>
			<div className='p-2 text-left'>
				<h2 className='font-semibold text-gray-900 text-lg text-justify truncate'>
					{product.name}
				</h2>
				{product.offer_price ? (
					<div className='flex items-center space-x-2'>
						<p className='font-extrabold text-xl text-gray-900'>
							${product.offer_price}
						</p>
						<p className='line-through text-red-500 text-lg'>
							${product.price}
						</p>
					</div>
				) : (
					<p className='font-extrabold text-gray-900 text-xl'>
						${product.price}
					</p>
				)}
			</div>
		</div>
	)
}

export default ProductCard

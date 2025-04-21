'use client'

import { Button } from '@mui/material'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function OrderSuccessPage() {
	const searchParams = useSearchParams()
	const orderID = searchParams.get('order_id')

	return (
		<div className='min-h-[80vh] flex flex-col items-center justify-center text-center'>
			<h1 className='text-3xl font-bold text-green-600 mb-4'>
				🎉 Order Successful!
			</h1>
			{orderID ? (
				<>
					<p className='text-lg'>Your order has been placed successfully.</p>
					<p className='font-semibold text-md text-gray-600 my-4'>
						Order ID: <span className='font-mono'>{orderID}</span>
					</p>
					<Button
						type='submit'
						variant='contained'
						sx={{
							color: '#FFFFFF',
							backgroundColor: '#1F1F1F',
							'&:hover': {
								backgroundColor: '#333333',
							},
							cursor: 'pointer',
							height: '3rem',
							fontSize: '1.125rem',
						}}
					>
						<Link href='/'>Return to Home</Link>
					</Button>
				</>
			) : (
				<p className='text-lg text-gray-600'>Thank you for your purchase!</p>
			)}
		</div>
	)
}

'use client'

import { Button, CircularProgress } from '@mui/material'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function OrderCancelClient() {
	const searchParams = useSearchParams()
	const orderID = searchParams.get('order_id')

	if (!orderID) {
		return (
			<div className='min-h-[70vh] flex flex-col justify-center items-center'>
				<CircularProgress color='default' />
			</div>
		)
	}

	return (
		<div className='min-h-[70vh] flex flex-col justify-center items-center text-center p-4'>
			<h1 className='text-3xl font-bold text-yellow-600 mb-4'>
				Payment Cancelled
			</h1>
			<p className='text-lg mb-2'>
				Your payment for order ID <strong>{orderID}</strong> was cancelled.
			</p>
			<p className='text-lg text-gray-600 my-4'>
				You can return to the cart and try again.
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
		</div>
	)
}

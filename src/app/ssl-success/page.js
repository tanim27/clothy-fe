// 'use client'
// import axios from 'axios'
// import { useRouter, useSearchParams } from 'next/navigation'
// import { useEffect } from 'react'

// export default function SslSuccessPage() {
// 	const searchParams = useSearchParams()
// 	const router = useRouter()

// 	useEffect(() => {
// 		const tran_id = searchParams.get('tran_id')
// 		const val_id = searchParams.get('val_id')

// 		const verifyPayment = async () => {
// 			if (!tran_id || !val_id) return

// 			try {
// 				const res = await axios.post(
// 					`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/orders/ssl-success`,
// 					new URLSearchParams({ tran_id, val_id }),
// 					{
// 						headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
// 					},
// 				)
// 				console.log('Payment verified:', res.data)
// 				router.push(`/order-success?order_id=${tran_id}`)
// 			} catch (err) {
// 				console.error('Verification failed:', err)
// 				router.push('/payment-failed')
// 			}
// 		}

// 		verifyPayment()
// 	}, [searchParams, router])

// 	return (
// 		<div className='text-center p-10'>
// 			<h2 className='text-xl font-semibold'>Verifying Payment...</h2>
// 		</div>
// 	)
// }

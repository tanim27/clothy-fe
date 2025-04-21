import { Suspense } from 'react'
import OrderSuccessClient from './OrderSuccessClient'

export default function OrderSuccessPage() {
	return (
		<Suspense
			fallback={
				<div className='min-h-[70vh] flex flex-col justify-center items-center'>
					<p>Loading...</p>
				</div>
			}
		>
			<OrderSuccessClient />
		</Suspense>
	)
}

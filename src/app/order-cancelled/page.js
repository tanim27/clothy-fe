import { Suspense } from 'react'
import OrderCancelClient from './OrderCancelClient'

export default function OrderCancelledPage() {
	return (
		<Suspense
			fallback={
				<div className='min-h-[70vh] flex flex-col justify-center items-center'>
					<p>Loading...</p>
				</div>
			}
		>
			<OrderCancelClient />
		</Suspense>
	)
}

import { Suspense } from 'react'
import OrderFailClient from './OrderFailClient'

export default function OrderFailPage() {
	return (
		<Suspense
			fallback={
				<div className='min-h-[70vh] flex flex-col justify-center items-center'>
					<p>Loading...</p>
				</div>
			}
		>
			<OrderFailClient />
		</Suspense>
	)
}

export const metadata = {
	title: 'Clothy | Track-order',
	description: 'Clothy application track-order page.',
}

import TrackOrder from '@/components/track-order/TrackOrder'

const TrackOrderPage = () => {
	return (
		<div className='min-h-screen'>
			<TrackOrder />
		</div>
	)
}

export default TrackOrderPage

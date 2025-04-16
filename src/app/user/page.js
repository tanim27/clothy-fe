export const metadata = {
	title: 'Clothy | Profile',
	description: 'Clothy application user profile page.',
}

import User from '@/components/user/User'

const UserPage = () => {
	return (
		<div className='min-h-screen flex justify-center items-start p-8'>
			<User />
		</div>
	)
}

export default UserPage

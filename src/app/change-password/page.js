export const metadata = {
	title: 'Clothy | Change password',
	description: 'Clothy application change password page.',
}

import ChangePassword from '@/components/Password-Format/change-password/ChangePassword'

const ChangePasswordPage = () => {
	return (
		<div className='min-h-screen flex justify-center items-center'>
			<ChangePassword />
		</div>
	)
}

export default ChangePasswordPage

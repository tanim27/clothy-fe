export const metadata = {
	title: 'Clothy | Reset password',
	description: 'Clothy application reset password page.',
}

import ResetPassword from '@/components/Password-Format/reset-password/ResetPassword'

const ResetPasswordPage = () => {
	return (
		<div className='min-h-screen flex justify-center items-center'>
			<ResetPassword />
		</div>
	)
}

export default ResetPasswordPage

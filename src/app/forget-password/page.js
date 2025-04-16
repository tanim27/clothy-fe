export const metadata = {
	title: 'Clothy | Forget password',
	description: 'Clothy application forget password page.',
}

import ForgetPassword from '@/components/Password-Format/forget-password/ForgetPassword'

const ForgetPasswordPage = () => {
	return (
		<div className='min-h-screen flex justify-center items-center'>
			<ForgetPassword />
		</div>
	)
}

export default ForgetPasswordPage

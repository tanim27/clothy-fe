'use client'

import { useForgetPassword } from '@/hooks/useUser'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { enqueueSnackbar } from 'notistack'
import * as Yup from 'yup'

const ForgotPasswordSchema = Yup.object({
	email: Yup.string().email('Invalid email').required('Required'),
})

const ForgetPasswordPage = () => {
	const { mutateAsync, isPending } = useForgetPassword()

	const handleSubmit = async (values, { resetForm }) => {
		try {
			await mutateAsync(values)
			enqueueSnackbar('Reset link sent to your email', { variant: 'success' })
			resetForm()
		} catch (error) {
			const message = error?.message || 'Failed to send reset link'
			enqueueSnackbar(message, { variant: 'error' })
		}
	}

	return (
		<div className='max-w-md mx-auto p-6'>
			<h1 className='text-xl font-bold mb-4'>Forgot Password</h1>
			<Formik
				initialValues={{ email: '' }}
				validationSchema={ForgotPasswordSchema}
				onSubmit={handleSubmit}
			>
				<Form className='space-y-4'>
					<div>
						<label>Email</label>
						<Field
							name='email'
							type='email'
							className='w-full border px-3 py-2 rounded'
						/>
						<ErrorMessage
							name='email'
							component='div'
							className='text-red-500 text-sm'
						/>
					</div>
					<button
						type='submit'
						disabled={isPending}
						className='bg-blue-600 text-white px-4 py-2 rounded'
					>
						{isPending ? 'Sending...' : 'Send Reset Link'}
					</button>
				</Form>
			</Formik>
		</div>
	)
}

export default ForgetPasswordPage

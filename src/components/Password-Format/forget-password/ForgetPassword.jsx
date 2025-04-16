'use client'

import { useForgetPassword } from '@/hooks/useUser'
import { ForgotPasswordValidationSchema } from '@/lib/validations'
import { Button } from '@mui/material'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { enqueueSnackbar } from 'notistack'

const ForgetPassword = () => {
	const { mutateAsync, isPending } = useForgetPassword()

	const handleSubmit = async (values, { resetForm }) => {
		try {
			await mutateAsync(values)
			enqueueSnackbar('Reset link sent to your email.', { variant: 'success' })
			resetForm()
		} catch (error) {
			const message = error?.message || 'Failed to send reset link.'
			enqueueSnackbar(message, { variant: 'error' })
		}
	}

	return (
		<div className='w-full max-w-lg mx-auto p-8 bg-white rounded-lg shadow-xl'>
			<h2 className='text-4xl font-bold text-center text-[#1F1F1F] mb-6'>
				Forgot Password
			</h2>
			<Formik
				initialValues={{ email: '' }}
				validationSchema={ForgotPasswordValidationSchema}
				onSubmit={handleSubmit}
			>
				{({ isSubmitting }) => (
					<Form className='space-y-6'>
						<div>
							<label className='block text-lg font-medium text-[#1F1F1F] mb-2'>
								Email Address
							</label>
							<Field
								name='email'
								type='email'
								placeholder='Enter your email'
								className='w-full px-4 py-3 border border-gray-300 rounded-lg'
							/>
							<ErrorMessage
								name='email'
								component='div'
								className='text-red-500 text-sm'
							/>
						</div>

						<Button
							type='submit'
							variant='contained'
							disabled={isSubmitting || isPending}
							sx={{
								backgroundColor: '#1F1F1F',
								color: '#FFFFFF',
								'&:hover': {
									backgroundColor: '#333333',
								},
								height: '3rem',
								width: '100%',
								fontSize: '1.125rem',
							}}
						>
							{isPending ? 'Sending...' : 'Send Reset Link'}
						</Button>
					</Form>
				)}
			</Formik>
		</div>
	)
}

export default ForgetPassword

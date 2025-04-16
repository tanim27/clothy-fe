'use client'

import { useResetPassword } from '@/hooks/useUser'
import { ResetPasswordValidationSchema } from '@/lib/validations'
import { Button } from '@mui/material'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useParams, useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'

const ResetPassword = () => {
	const { token } = useParams()
	const router = useRouter()
	const { mutateAsync, isPending } = useResetPassword(token)

	const handleSubmit = async (values, { resetForm }) => {
		try {
			await mutateAsync(values)
			enqueueSnackbar('Password reset successfully.', { variant: 'success' })
			resetForm()
			router.push('/login')
		} catch (error) {
			const message = error?.message || 'Password reset failed.'
			enqueueSnackbar(message, { variant: 'error' })
		}
	}

	return (
		<div className='w-full max-w-lg mx-auto p-8 bg-white rounded-lg shadow-xl'>
			<h2 className='text-4xl font-bold text-center text-[#1F1F1F] mb-6'>
				Reset Password
			</h2>

			<Formik
				initialValues={{ newPassword: '' }}
				validationSchema={ResetPasswordValidationSchema}
				onSubmit={handleSubmit}
			>
				{({ isSubmitting }) => (
					<Form className='space-y-6'>
						<div>
							<label className='block text-lg font-medium text-[#1F1F1F] mb-2'>
								New Password
							</label>
							<Field
								name='newPassword'
								type='password'
								placeholder='Enter new password'
								className='w-full px-4 py-3 border border-gray-300 rounded-lg'
							/>
							<ErrorMessage
								name='newPassword'
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
							{isPending ? 'Resetting...' : 'Reset Password'}
						</Button>
					</Form>
				)}
			</Formik>
		</div>
	)
}

export default ResetPassword

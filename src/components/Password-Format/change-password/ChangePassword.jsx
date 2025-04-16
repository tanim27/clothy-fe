'use client'

import { useChangePassword } from '@/hooks/useUser'
import { ChangePasswordValidationSchema } from '@/lib/validations'
import { Button, CircularProgress } from '@mui/material'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useSession } from 'next-auth/react'
import { useSnackbar } from 'notistack'

const ChangePassword = () => {
	const { data: session, status } = useSession()
	const { enqueueSnackbar } = useSnackbar()
	const { mutateAsync, isPending } = useChangePassword()

	if (status === 'loading')
		return (
			<div className='h-screen flex justify-center items-center'>
				<CircularProgress color='default' />
			</div>
		)
	if (!session)
		return (
			<div className='h-screen flex justify-center items-center'>
				<p>You must be signed in to view this page.</p>
			</div>
		)

	const user = session?.user

	const initialValues = {
		email: '',
		currentPassword: '',
		newPassword: '',
	}

	const handleSubmit = async (values, { resetForm, setSubmitting }) => {
		try {
			await mutateAsync({ email: user.email, ...values })
			enqueueSnackbar('Password updated successfully', {
				variant: 'success',
			})
			resetForm()
		} catch (error) {
			enqueueSnackbar(error?.message || 'Failed to update password', {
				variant: 'error',
			})
		} finally {
			setSubmitting(false)
		}
	}

	return (
		<div className='w-full max-w-lg mx-auto p-8 bg-white rounded-lg shadow-xl'>
			<h2 className='font-bold text-4xl text-center text-[#1F1F1F] mb-6'>
				Change Your Password
			</h2>

			<Formik
				initialValues={initialValues}
				validationSchema={ChangePasswordValidationSchema}
				onSubmit={handleSubmit}
			>
				{({ isSubmitting }) => (
					<Form className='space-y-6'>
						<div>
							<label className='block text-lg font-medium text-[#1F1F1F] mb-2'>
								Email Address
							</label>
							<Field
								type='email'
								name='email'
								placeholder='Enter your email'
								className='w-full px-4 py-3 border border-gray-300 rounded-lg'
							/>
							<ErrorMessage
								name='email'
								component='div'
								className='text-red-500 text-sm'
							/>
						</div>

						<div>
							<label className='block text-lg font-medium text-[#1F1F1F] mb-2'>
								Current Password
							</label>
							<Field
								type='password'
								name='currentPassword'
								placeholder='Enter current password'
								className='w-full px-4 py-3 border border-gray-300 rounded-lg'
							/>
							<ErrorMessage
								name='currentPassword'
								component='div'
								className='text-red-500 text-sm'
							/>
						</div>

						<div>
							<label className='block text-lg font-medium text-[#1F1F1F] mb-2'>
								New Password
							</label>
							<Field
								type='password'
								name='newPassword'
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
							{isPending ? 'Updating...' : 'Update Password'}
						</Button>
					</Form>
				)}
			</Formik>
		</div>
	)
}

export default ChangePassword

'use client'

import { useChangePassword } from '@/hooks/useUser'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useSession } from 'next-auth/react'
import { useSnackbar } from 'notistack'
import * as Yup from 'yup'

const ChangePasswordPage = () => {
	const { data: session, status } = useSession()
	const { enqueueSnackbar } = useSnackbar()
	const { mutate, isPending } = useChangePassword()

	if (status === 'loading') return <p>Loading...</p>
	if (!session) return <p>You must be signed in to view this page.</p>

	const user = session?.user

	const validationSchema = Yup.object({
		email: Yup.string().email('Invalid email').required('Required'),
		currentPassword: Yup.string().required('Current password is required'),
		newPassword: Yup.string()
			.min(6, 'Password must be at least 6 characters')
			.required('New password is required'),
	})

	const handleSubmit = (values, { resetForm, setSubmitting }) => {
		try {
			mutate({ email: user.email, ...values })
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
		<div className='p-6 max-w-xl mx-auto'>
			<h1 className='text-2xl font-bold mb-4'>Reset Your Password</h1>

			<Formik
				initialValues={{
					email: '',
					currentPassword: '',
					newPassword: '',
				}}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
			>
				{({ isSubmitting }) => (
					<Form className='space-y-4'>
						<div>
							<label className='block font-medium'>Email</label>
							<Field
								type='email'
								name='email'
								className='w-full p-2 border rounded'
							/>
							<ErrorMessage
								name='email'
								component='p'
								className='text-red-500 text-sm'
							/>
						</div>

						<div>
							<label className='block font-medium'>Current Password</label>
							<Field
								type='password'
								name='currentPassword'
								className='w-full p-2 border rounded'
							/>
							<ErrorMessage
								name='currentPassword'
								component='p'
								className='text-red-500 text-sm'
							/>
						</div>

						<div>
							<label className='block font-medium'>New Password</label>
							<Field
								type='password'
								name='newPassword'
								className='w-full p-2 border rounded'
							/>
							<ErrorMessage
								name='newPassword'
								component='p'
								className='text-red-500 text-sm'
							/>
						</div>

						<button
							type='submit'
							disabled={isSubmitting || isPending}
							className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50'
						>
							{isPending ? 'Updating...' : 'Update Password'}
						</button>
					</Form>
				)}
			</Formik>
		</div>
	)
}

export default ChangePasswordPage

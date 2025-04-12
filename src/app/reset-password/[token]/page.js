'use client'

import { useResetPassword } from '@/hooks/useUser'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useParams, useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import * as Yup from 'yup'

const ResetSchema = Yup.object({
	newPassword: Yup.string()
		.min(6, 'Password must be at least 6 characters')
		.required('Required'),
})

export default function ResetPasswordPage() {
	const { token } = useParams()
	const router = useRouter()
	const { mutateAsync, isPending } = useResetPassword(token)

	const handleSubmit = async (values, { resetForm }) => {
		try {
			await mutateAsync(values)
			enqueueSnackbar('Password reset successfully', { variant: 'success' })
			resetForm()
			router.push('/login')
		} catch (error) {
			const message = error?.message || 'Password reset failed'
			enqueueSnackbar(message, { variant: 'error' })
		}
	}

	return (
		<div className='max-w-md mx-auto p-6'>
			<h1 className='text-xl font-bold mb-4'>Reset Password</h1>
			<Formik
				initialValues={{ newPassword: '' }}
				validationSchema={ResetSchema}
				onSubmit={handleSubmit}
			>
				<Form className='space-y-4'>
					<div>
						<label>New Password</label>
						<Field
							name='newPassword'
							type='password'
							className='w-full border px-3 py-2 rounded'
						/>
						<ErrorMessage
							name='newPassword'
							component='div'
							className='text-red-500 text-sm'
						/>
					</div>
					<button
						type='submit'
						disabled={isPending}
						className='bg-green-600 text-white px-4 py-2 rounded'
					>
						{isPending ? 'Resetting...' : 'Reset Password'}
					</button>
				</Form>
			</Formik>
		</div>
	)
}

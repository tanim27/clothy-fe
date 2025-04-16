'use client'

import { useUserRegister } from '@/hooks/useAuth'
import {
	UserLoginValidationSchema,
	UserRegisterValidationSchema,
} from '@/lib/validations'

import { Button, CircularProgress } from '@mui/material'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import { useState } from 'react'

export const UserLoginForm = () => {
	const { data: session } = useSession()
	const router = useRouter()
	const [loading, setLoading] = useState(false)

	const handleSubmit = async (values, { setSubmitting, resetForm }) => {
		try {
			const result = await signIn('credentials', {
				redirect: false,
				email: values.email,
				password: values.password,
			})

			if (result?.error) {
				resetForm()
				enqueueSnackbar('Login failed. Invalid credentials.', {
					variant: 'error',
				})
				return
			} else {
				resetForm()
				enqueueSnackbar('Successfully logged in.', { variant: 'success' })
				setLoading(true)
				setTimeout(() => {
					setLoading(false)
				}, 3000)
				router.push('/')
			}
		} catch (error) {
			enqueueSnackbar('An error occurred. Try again.', { variant: 'error' })
		} finally {
			setSubmitting(false)
		}
	}

	if (loading) {
		return (
			<div className='flex justify-center items-center h-screen'>
				<CircularProgress
					size={60}
					color='default'
				/>
			</div>
		)
	}

	return (
		<div className='w-full max-w-lg mx-auto p-8 bg-white rounded-lg shadow-xl'>
			<h2 className='text-4xl font-bold text-center text-[#1F1F1F] mb-6'>
				User Login
			</h2>
			<Formik
				initialValues={{ email: '', password: '' }}
				validationSchema={UserLoginValidationSchema}
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
								Password
							</label>
							<Field
								type='password'
								name='password'
								placeholder='Enter your password'
								className='w-full px-4 py-3 border border-gray-300 rounded-lg'
							/>
							<ErrorMessage
								name='password'
								component='div'
								className='text-red-500 text-sm'
							/>
						</div>

						<div className='text-lg text-center'>
							<a
								href='/forget-password'
								className='text-[#1F1F1F] hover:underline transition duration-300'
							>
								Forget password?
							</a>
						</div>

						<Button
							type='submit'
							variant='contained'
							disabled={isSubmitting}
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
							{isSubmitting ? 'Logging in...' : 'Login'}
						</Button>

						<div className='mt-6 text-center'>
							<p className='text-lg text-gray-600'>
								Don&apos;t have an account?{' '}
								<a
									href='/register'
									className='text-[#1F1F1F] hover:underline transition duration-300'
								>
									Register
								</a>
							</p>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	)
}

export const UserRegisterForm = () => {
	const { data: session } = useSession()
	const router = useRouter()
	const { mutateAsync: registerUser, isPending } = useUserRegister()
	const [loading, setLoading] = useState(false)

	const handleSubmit = async (values, { setSubmitting, resetForm }) => {
		try {
			await registerUser(values)

			// Automatically log in after registration
			const result = await signIn('credentials', {
				redirect: false,
				email: values.email,
				password: values.password,
			})

			if (result?.error) {
				resetForm()
				enqueueSnackbar(
					'Registration failed. Please try logging in manually.',
					{
						variant: 'error',
					},
				)
				return
			} else {
				resetForm()
				enqueueSnackbar('Registration successful! Logging in...', {
					variant: 'success',
				})
				setLoading(true)
				setTimeout(() => {
					setLoading(false)
				}, 3000)
				router.push('/')
			}
		} catch (error) {
			enqueueSnackbar(error.response?.data?.message, {
				variant: 'error',
			})
		} finally {
			setSubmitting(false)
		}
	}

	if (loading) {
		return (
			<div className='flex justify-center items-center h-screen'>
				<CircularProgress
					size={60}
					color='default'
				/>
			</div>
		)
	}

	return (
		<div className='w-full max-w-lg mx-auto p-8 bg-white rounded-lg shadow-xl'>
			<h2 className='text-4xl font-bold text-center text-[#1F1F1F] mb-6'>
				User Registration
			</h2>
			<Formik
				initialValues={{ name: '', email: '', password: '' }}
				validationSchema={UserRegisterValidationSchema}
				onSubmit={handleSubmit}
			>
				{({ isSubmitting }) => (
					<Form className='space-y-6'>
						<div>
							<label className='block text-lg font-medium text-[#1F1F1F] mb-2'>
								Full Name
							</label>
							<Field
								type='text'
								name='name'
								placeholder='Enter your full name'
								className='w-full px-4 py-3 border border-gray-300 rounded-lg'
							/>
							<ErrorMessage
								name='name'
								component='div'
								className='text-red-500 text-sm'
							/>
						</div>

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
								Password
							</label>
							<Field
								type='password'
								name='password'
								placeholder='Enter your password'
								className='w-full px-4 py-3 border border-gray-300 rounded-lg'
							/>
							<ErrorMessage
								name='password'
								component='div'
								className='text-red-500 text-sm'
							/>
						</div>

						<Button
							type='submit'
							variant='contained'
							disabled={isSubmitting}
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
							{isSubmitting ? 'Registering...' : 'Register'}
						</Button>

						<div className='mt-6 text-center'>
							<p className='text-lg text-gray-600'>
								Already have an account?{' '}
								<Link
									href='/login'
									className='text-[#1F1F1F] hover:underline transition duration-300'
								>
									Login
								</Link>
							</p>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	)
}

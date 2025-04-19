'use client'

import { Button, CircularProgress } from '@mui/material'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

const User = () => {
	const { data: session, status } = useSession()

	if (status === 'loading') {
		return (
			<div className='h-screen flex justify-center items-center'>
				<CircularProgress color='default' />
			</div>
		)
	}
	if (!session) {
		return (
			<div className='h-screen flex justify-center items-center'>
				<p>You must be signed in to view this page.</p>
			</div>
		)
	}

	const { user } = session
	const isGoogleUser = user?.provider === 'google'

	return (
		<div className='w-full max-w-3xl mx-auto px-4 sm:px-6 py-6 mb-4'>
			<h1 className='font-extrabold text-4xl text-center text-[#1A1A1D] mb-6'>
				Your Profile
			</h1>

			<div className='bg-white p-6 rounded-md shadow-md space-y-6'>
				<div className='text-md text-[#1F1F1F] space-y-4'>
					<p>
						<span className='font-semibold text-[#1A1A1D]'>Name:</span>{' '}
						<span className='font-medium text-gray-900'>{user?.name}</span>
					</p>
					<p>
						<span className='font-semibold text-[#1A1A1D]'>Email:</span>{' '}
						<span className='font-medium text-gray-900'>{user?.email}</span>
					</p>
					<p>
						<span className='font-semibold text-[#1A1A1D]'>Password:</span>{' '}
						<span className='font-medium text-gray-900'>********</span>
					</p>

					{isGoogleUser && (
						<p className='text-sm text-red-600 font-medium'>
							You are logged in by your google account.
						</p>
					)}
				</div>

				<Button
					type='submit'
					variant='contained'
					disabled={isGoogleUser}
					sx={{
						backgroundColor: '#1F1F1F',
						color: '#FFFFFF',
						'&:hover': {
							backgroundColor: isGoogleUser ? '#1F1F1F' : '#333333',
						},
						opacity: isGoogleUser ? 0.6 : 1,
						cursor: isGoogleUser ? 'not-allowed' : 'pointer',
						height: '3rem',
						width: '100%',
						fontSize: '1.125rem',
					}}
				>
					<Link href='/change-password'>Change Password</Link>
				</Button>
			</div>
		</div>
	)
}

export default User

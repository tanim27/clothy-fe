'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'

export default function UserPage() {
	const { data: session, status } = useSession()

	console.log('Session:', session)

	if (status === 'loading') {
		return <p>Loading...</p>
	}

	if (!session) {
		return <p>You must be signed in to view this page.</p>
	}

	const { user } = session

	return (
		<div className='p-6 max-w-2xl mx-auto'>
			<h1 className='text-2xl font-bold mb-4'>Your Profile</h1>
			<div className='bg-white shadow-md rounded-lg p-4'>
				<p>
					<strong>Name:</strong> {user?.user?.name}
				</p>
				<p>
					<strong>Email:</strong> {user?.user?.email}
				</p>
				<p>
					<strong>Password:</strong> ********
				</p>

				<Link
					href='/change-password'
					className='text-blue-600 hover:underline mt-4 inline-block'
				>
					Change Password
				</Link>

				{/* Add more user fields if available */}
				{/* Example: <p><strong>Phone:</strong> {user.phone}</p> */}
			</div>
		</div>
	)
}

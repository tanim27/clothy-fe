'use client'

import { UserLoginForm } from '@/components/auth/UserAuthForm'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const UserLoginPage = () => {
	const { data: session, status } = useSession()
	const router = useRouter()

	useEffect(() => {
		if (status === 'authenticated') {
			router.replace('/')
		}
	}, [status, router])

	return (
		<div className='min-h-screen flex justify-center items-center p-8'>
			<UserLoginForm />
		</div>
	)
}

export default UserLoginPage

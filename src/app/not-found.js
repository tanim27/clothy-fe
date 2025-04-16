'use client'

import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import { Button } from '@mui/material'
import Link from 'next/link'

export default function NotFound() {
	return (
		<div className='flex flex-col items-center justify-center min-h-screen p-4'>
			<div className='bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center'>
				<ErrorOutlineIcon style={{ fontSize: 64, color: '#f44336' }} />
				<h1 className='text-3xl font-bold mt-4'>Page Not Found</h1>
				<p className='text-gray-600 my-2'>
					The page you are looking for does not exist.
				</p>
				<Link href='/'>
					<Button
						type='button'
						variant='contained'
						startIcon={<HomeRoundedIcon />}
						sx={{
							backgroundColor: '#1F1F1F',
							color: '#FFFFFF',
							'&:hover': {
								backgroundColor: '#333333',
							},
						}}
					>
						Go To Home
					</Button>
				</Link>
			</div>
		</div>
	)
}

import Footer from '@/components/shared/Footer'
import Navbar from '@/components/shared/Navbar'
import AppProviders from '@/providers/AppProviders'
import '@/styles/globals.css'
import { CircularProgress } from '@mui/material'
import { Suspense } from 'react'

export const metadata = {
	title: 'Clothy',
	description: 'Clothy application',
}

const RootLayout = ({ children, session }) => {
	return (
		<html lang='en'>
			<body className='min-h-screen flex flex-col'>
				<AppProviders session={session}>
					<Suspense
						fallback={
							<div>
								<CircularProgress color='default' />
							</div>
						}
					>
						<Navbar />
					</Suspense>
					<main className='min-h-screen flex-grow'>{children}</main>
					<Footer />
				</AppProviders>
			</body>
		</html>
	)
}

export default RootLayout

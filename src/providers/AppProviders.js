'use client'

import { CustomAuthProvider } from '@/context/AuthContext'
import AuthProvider from './AuthProvider'
import { CartProvider } from './CartProvider'
import NotistackProvider from './NotistackProvider'
import ReactQueryProvider from './ReactQueryProvider'

const AppProviders = ({ children, session }) => {
	return (
		<ReactQueryProvider>
			<AuthProvider session={session}>
				<CustomAuthProvider>
					<CartProvider>
						<NotistackProvider>{children}</NotistackProvider>
					</CartProvider>
				</CustomAuthProvider>
			</AuthProvider>
		</ReactQueryProvider>
	)
}

export default AppProviders

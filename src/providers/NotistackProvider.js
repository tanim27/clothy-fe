'use client'

import { SnackbarProvider } from 'notistack'

const NotistackProvider = ({ children }) => {
	return (
		<SnackbarProvider
			maxSnack={3}
			anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
		>
			{children}
		</SnackbarProvider>
	)
}

export default NotistackProvider

'use client'

import { CheckCircle, Error as ErrorIcon } from '@mui/icons-material'
import { SnackbarContent } from '@mui/material'
import { SnackbarProvider } from 'notistack'
import { forwardRef } from 'react'

const CustomSnackbar = forwardRef(function CustomSnackbar(props, ref) {
	const { message, variant } = props

	const isSuccess = variant === 'success'
	const isError = variant === 'error'

	return (
		<SnackbarContent
			ref={ref}
			style={{
				backgroundColor: isSuccess
					? '#1A1A1D'
					: isError
					? '#FE4F2D'
					: undefined,
				color: '#fff',
			}}
			message={
				<span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
					{isSuccess && <CheckCircle fontSize='small' />}
					{isError && <ErrorIcon fontSize='small' />}
					{message}
				</span>
			}
		/>
	)
})

const NotistackProvider = ({ children }) => {
	return (
		<SnackbarProvider
			maxSnack={3}
			anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
			Components={{
				success: CustomSnackbar,
				error: CustomSnackbar,
			}}
		>
			{children}
		</SnackbarProvider>
	)
}

export default NotistackProvider

import * as Yup from 'yup'

export const UserLoginValidationSchema = Yup.object({
	email: Yup.string().email('Invalid email').required('Email is required'),
	password: Yup.string().required('Password is required'),
})

export const UserRegisterValidationSchema = Yup.object({
	name: Yup.string().required('Name is required'),
	email: Yup.string().email('Invalid email').required('Email is required'),
	password: Yup.string()
		.min(6, 'Password must be at least 6 characters')
		.required('Password is required'),
})

export const OrderValidationSchema = Yup.object({
	phone_number: Yup.string()
		.required('Phone number is required')
		.matches(/^[0-9]{11}$/, 'Phone number must be 11 digits'),

	shipping_address: Yup.object({
		street: Yup.string().required('Street address is required'),
		city: Yup.string().required('City is required'),
		state: Yup.string().required('State is required'),
		postal_code: Yup.string()
			.required('Postal code is required')
			.matches(/^[0-9]{4}$/, 'Postal code must be 4 digits'),
		country: Yup.string().required('Country is required'),
	}),

	payment_method: Yup.string()
		.oneOf(['Cash On Delivery', 'sslcommerz'], 'Invalid payment method')
		.required('Please select a payment method'),
})

export const ChangePasswordValidationSchema = Yup.object({
	email: Yup.string().email('Invalid email').required('Email is required'),
	currentPassword: Yup.string().required('Current password is required'),
	newPassword: Yup.string()
		.min(6, 'Password must be at least 6 characters')
		.required('New password is required'),
})

export const ForgotPasswordValidationSchema = Yup.object({
	email: Yup.string()
		.email('Invalid email')
		.required('Required email address to send a reset link.'),
})

export const ResetPasswordValidationSchema = Yup.object({
	newPassword: Yup.string()
		.min(6, 'Password must be at least 6 characters')
		.required('Password required to reset the old password'),
})

export const TrackOrderValidationSchema = Yup.object({
	phoneNumber: Yup.string()
		.required('Phone number is required')
		.matches(/^[0-9]{11}$/, 'Phone number must be 11 digits'),
})

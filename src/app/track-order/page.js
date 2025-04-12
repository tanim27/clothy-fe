'use client'
import { useTrackOrder } from '@/hooks/useOrders'
import { Button } from '@mui/material'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { enqueueSnackbar } from 'notistack'
import { useState } from 'react'
import * as Yup from 'yup'

const validationSchema = Yup.object({
	orderID: Yup.string().required('Order ID is required'),
	phoneNumber: Yup.string().required('Phone Number is required'),
})

const TrackOrderPage = () => {
	const [orderID, setOrderID] = useState('')
	const [phoneNumber, setPhoneNumber] = useState('')
	const {
		data: order,
		isLoading,
		error,
		refetch,
	} = useTrackOrder(orderID, phoneNumber)

	const handleSubmit = async (values, { setSubmitting }) => {
		try {
			setOrderID(values.orderID)
			setPhoneNumber(values.phoneNumber)

			const result = await refetch() // 👈 explicitly fetch
			if (result?.data?.order) {
				enqueueSnackbar('Order details found.', { variant: 'success' })
			}
		} catch (err) {
			console.error('Error fetching order:', err)
			enqueueSnackbar(err?.response?.data?.message || 'Failed to track order', {
				variant: 'error',
			})
		} finally {
			setSubmitting(false)
		}
	}

	return (
		<div className='px-4 py-10 max-w-3xl mx-auto'>
			<h1 className='font-extrabold text-4xl text-center mb-6 text-[#1a1a1d]'>
				Track Your Order
			</h1>
			<div className='bg-white p-6 rounded-md shadow-md'>
				<Formik
					initialValues={{ orderID: '', phoneNumber: '' }}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
				>
					{({ isSubmitting }) => (
						<Form className='space-y-6'>
							<div>
								<Field
									type='text'
									name='orderID'
									placeholder='Enter your Order ID'
									className='w-full p-3 border border-gray-300 rounded-md transition'
								/>
								<ErrorMessage
									name='orderID'
									component='div'
									className='text-red-500 text-sm mt-1'
								/>
							</div>
							<div>
								<Field
									type='text'
									name='phoneNumber'
									placeholder='Enter your Phone Number'
									className='w-full p-3 border border-gray-300 rounded-md transition'
								/>
								<ErrorMessage
									name='phoneNumber'
									component='div'
									className='text-red-500 text-sm mt-1'
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
								{isSubmitting ? 'Tracking...' : 'Track Order'}
							</Button>
						</Form>
					)}
				</Formik>
			</div>

			{error && (
				<p className='text-red-500 text-center mt-4'>{error.message}</p>
			)}

			{order && (
				<div className='mt-8 bg-gray-100 p-6 rounded-md shadow-md space-y-6'>
					<h2 className='font-bold text-4xl text-center text-gray-800 mb-6'>
						Order Summary
					</h2>

					<div className='grid gap-6 sm:grid-cols-2 text-base text-gray-800'>
						<p>
							<span className='font-semibold text-[#1A1A1D]'>Order ID:</span>{' '}
							<span className='font-medium text-gray-900'>
								{order?.order?.order_id}
							</span>
						</p>
						<p>
							<span className='font-semibold text-[#1A1A1D]'>
								Phone Number:
							</span>{' '}
							<span className='font-medium text-gray-900'>
								{order?.order?.phone_number}
							</span>
						</p>
						<p>
							<span className='font-semibold text-[#1A1A1D]'>
								Order Status:
							</span>{' '}
							<span className='font-bold text-blue-700'>
								{order?.order?.order_status}
							</span>
						</p>
						<p>
							<span className='font-semibold text-[#1A1A1D]'>
								Payment Status:
							</span>{' '}
							<span className='font-bold text-blue-700'>
								{order?.order?.payment_status}
							</span>
						</p>
						<p>
							<span className='font-semibold text-[#1A1A1D]'>Total Price:</span>{' '}
							<span className='font-bold text-green-700'>
								${order?.order?.total_price}
							</span>
						</p>
						<p>
							<span className='font-semibold text-[#1A1A1D]'>
								Payment Method:
							</span>{' '}
							<span className='font-medium text-gray-900'>
								{order?.order?.payment_method.toUpperCase()}
							</span>
						</p>
					</div>

					<div>
						<h3 className='text-xl font-semibold mb-2 text-gray-800'>
							Shipping Address
						</h3>
						<p className='text-gray-700 text-base'>
							{order?.order?.shipping_address.street},{' '}
							{order?.order?.shipping_address.city},{' '}
							{order?.order?.shipping_address.state},{' '}
							{order?.order?.shipping_address.postal_code},{' '}
							{order?.order?.shipping_address.country}
						</p>
					</div>

					<div>
						<h3 className='text-xl font-semibold mb-3 text-gray-800'>
							Products
						</h3>
						<ul className='space-y-4'>
							{order?.order?.products.map((item) => (
								<li
									key={item._id}
									className='p-4 bg-white rounded-md shadow-sm text-base text-gray-800 space-y-1'
								>
									<p>
										<span className='font-semibold text-[#1A1A1D]'>Name:</span>{' '}
										<span className='font-medium'>{item.name}</span>
									</p>
									<p>
										<span className='font-semibold text-[#1A1A1D]'>Size:</span>{' '}
										<span className='font-medium'>{item.size}</span>
									</p>
									<p>
										<span className='font-semibold text-[#1A1A1D]'>
											Regular Price:
										</span>{' '}
										<span className='font-medium text-[#1A1A1D]'>
											${item.price}
										</span>
									</p>
									<p>
										<span className='font-semibold text-[#1A1A1D]'>
											Offer Price:
										</span>{' '}
										<span className='font-medium text-[#1A1A1D]'>
											{/* ${item.offer_price} */}
											{item.offer_price ? `$${item.offer_price}` : 'N/A'}
										</span>
									</p>
									<p>
										<span className='font-semibold text-[#1A1A1D]'>
											Quantity:
										</span>{' '}
										<span className='font-medium text-[#1A1A1D]'>
											{item.quantity}
										</span>
									</p>
									<p>
										<span className='font-semibold text-[#1A1A1D]'>
											Sub-total:
										</span>{' '}
										<span className='font-bold text-green-700'>
											$
											{item.offer_price
												? item.offer_price * item.quantity
												: item.price * item.quantity}
										</span>
									</p>
								</li>
							))}
						</ul>
					</div>
				</div>
			)}
		</div>
	)
}

export default TrackOrderPage

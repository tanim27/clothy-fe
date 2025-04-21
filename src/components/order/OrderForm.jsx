'use client'

import { useCreateOrder } from '@/hooks/useOrders'
import { OrderValidationSchema } from '@/lib/validations'
import { useCartContext } from '@/providers/CartProvider'
import { Button, MenuItem, Select } from '@mui/material'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'

const OrderForm = () => {
	const { mutateAsync, isLoading, isError, isSuccess, error } = useCreateOrder()
	const router = useRouter()
	const { cart, clearCart, totalPrice } = useCartContext()

	const initialValues = {
		phone_number: '',
		products: cart.map((item) => ({
			product: item._id,
			size: item.selectedSize,
			quantity: item.quantity,
		})),
		shipping_address: {
			street: '',
			city: '',
			state: '',
			postal_code: '',
			country: '',
		},
		payment_method: 'Cash On Delivery',
	}

	const handleSubmit = async (values) => {
		if (values.products.length === 0) {
			console.error('Cart is empty. Cannot place order.')
			return
		}
		try {
			const res = await mutateAsync(values)

			clearCart()

			if (values.payment_method === 'Online') {
				if (res.gateway_url) {
					window.location.href = res.gateway_url
				} else {
					enqueueSnackbar('Failed to initiate payment', { variant: 'error' })
				}
			} else {
				if (res.redirect_url) {
					router.push(res.redirect_url)
				}
			}
		} catch (err) {
			enqueueSnackbar(err.message, { variant: 'error' })
		}
	}

	return (
		<div className='w-full max-w-screen-2xl mx-auto px-4 sm:px-6 py-6'>
			<h1 className='font-extrabold text-4xl text-center mb-6 text-[#1a1a1d]'>
				Checkout
			</h1>
			<Formik
				initialValues={initialValues}
				onSubmit={handleSubmit}
				validationSchema={OrderValidationSchema} // Apply the validation schema
				enableReinitialize
			>
				{({ isSubmitting, values, setFieldValue }) => (
					<div className='flex flex-col lg:flex-row justify-between gap-10 mb-8'>
						{/* Order Form */}
						<Form className='w-full lg:w-1/2 space-y-3'>
							<h2 className='font-bold text-2xl sm:text-3xl text-center text-[#1F1F1F] mb-4'>
								Address
							</h2>

							{/* Phone Number */}
							<div className='space-y-2'>
								<label className='font-semibold text-[#1F1F1F] mb-2'>
									Phone Number
								</label>
								<Field
									type='text'
									name='phone_number'
									placeholder='Phone number'
									className='w-full p-3 border border-gray-300 rounded-sm'
								/>
								<ErrorMessage
									name='phone_number'
									component='div'
									className='text-red-500 text-sm'
								/>
							</div>

							{/* Shipping Address */}
							<div className='space-y-2'>
								<label className='font-semibold text-[#1F1F1F] mb-2'>
									Shipping Address
								</label>
								<Field
									type='text'
									name='shipping_address.street'
									placeholder='Street'
									className='w-full p-3 border border-gray-300 rounded-sm'
								/>
								<ErrorMessage
									name='shipping_address.street'
									component='div'
									className='text-red-500 text-sm'
								/>

								<Field
									type='text'
									name='shipping_address.city'
									placeholder='City'
									className='w-full p-3 border border-gray-300 rounded-sm'
								/>
								<ErrorMessage
									name='shipping_address.city'
									component='div'
									className='text-red-500 text-sm'
								/>

								<Field
									type='text'
									name='shipping_address.state'
									placeholder='State'
									className='w-full p-3 border border-gray-300 rounded-sm'
								/>
								<ErrorMessage
									name='shipping_address.state'
									component='div'
									className='text-red-500 text-sm'
								/>

								<Field
									type='text'
									name='shipping_address.postal_code'
									placeholder='Postal Code'
									className='w-full p-3 border border-gray-300 rounded-sm'
								/>
								<ErrorMessage
									name='shipping_address.postal_code'
									component='div'
									className='text-red-500 text-sm'
								/>

								<Field
									type='text'
									name='shipping_address.country'
									placeholder='Country'
									className='w-full p-3 border border-gray-300 rounded-sm'
								/>
								<ErrorMessage
									name='shipping_address.country'
									component='div'
									className='text-red-500 text-sm'
								/>
							</div>

							{/* Payment Method */}
							<label className='font-semibold text-[#1F1F1F] mb-2'>
								Payment Method
							</label>
							<Select
								value={values.payment_method}
								onChange={(e) =>
									setFieldValue('payment_method', e.target.value)
								}
								fullWidth
								variant='standard'
								disableUnderline
								sx={{
									border: '2px solid #D1D5DB',
									borderRadius: '0.25rem',
									backgroundColor: 'white',
									px: 1.5,
									py: 1,
									'&:focus': {
										border: '2px solid #1F1F1F',
										outline: 'none',
									},
									'&:hover': {
										borderColor: '#1F1F1F',
									},
								}}
							>
								<MenuItem value='Cash On Delivery'>Cash On Delivery</MenuItem>
								<MenuItem value='Online'>Online Payment</MenuItem>
							</Select>
							<ErrorMessage
								name='payment_method'
								component='div'
								className='text-red-500 text-sm'
							/>

							{/* Submit Button */}
							<Button
								type='submit'
								variant='contained'
								disableElevation
								disabled={isSubmitting || isLoading}
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
								{isSubmitting || isLoading ? 'Processing...' : 'Place Order'}
							</Button>
						</Form>

						{/* Order Summary */}
						<div className='w-full lg:w-1/2 space-y-6'>
							<h2 className='font-bold text-2xl sm:text-3xl text-center text-[#1F1F1F] mb-4'>
								Order Summary
							</h2>
							<ul className='text-[#1F1F1F] space-y-4'>
								{cart.map((item, index) => (
									<li
										key={index}
										className='flex justify-between gap-4'
									>
										<div className='flex-1'>
											<h3 className='font-semibold text-[#1F1F1F]'>
												{item.name}
											</h3>
											<p className='text-sm'>Size - ({item.selectedSize})</p>
											<p className='text-sm'>Quantity - {item.quantity}</p>
											<p className='text-sm'>
												Price - ${item.offer_price ?? item.price}
											</p>
											<p className='text-sm font-medium'>
												Item total - $
												{(item.offer_price ?? item.price) * item.quantity}
											</p>
										</div>
										<div className='flex-shrink-0'>
											<Image
												src={item.image}
												alt={item.name}
												width={100}
												height={100}
												className='w-24 h-24 object-cover'
											/>
										</div>
									</li>
								))}
							</ul>
							<div className='bg-gray-100 px-4 py-4 rounded-md'>
								<p className='font-bold text-xl text-center'>
									Grand total: ${totalPrice}
								</p>
							</div>
						</div>
					</div>
				)}
			</Formik>
		</div>
	)
}

export default OrderForm

'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext()

export const CartProvider = ({ children }) => {
	const [cart, setCart] = useState([])

	// Load cart from sessionStorage on mount
	useEffect(() => {
		const storedCart = sessionStorage.getItem('cart')
		if (storedCart) {
			setCart(JSON.parse(storedCart))
		}
	}, [])

	// Save cart to sessionStorage whenever it changes
	useEffect(() => {
		sessionStorage.setItem('cart', JSON.stringify(cart))
	}, [cart])

	// Add to cart
	const addToCart = (product) => {
		const cartKey = `${product._id}-${product.selectedSize}`

		const existingItemIndex = cart.findIndex((item) => item.cartKey === cartKey)

		if (existingItemIndex !== -1) {
			const updatedCart = [...cart]
			updatedCart[existingItemIndex].quantity += product.quantity
			setCart(updatedCart)
		} else {
			setCart((prev) => [...prev, { ...product, cartKey }])
		}
	}

	// Update quantity
	const updateQuantity = (productId, selectedSize, newQuantity) => {
		const cartKey = `${productId}-${selectedSize}`
		setCart((prev) =>
			prev.map((item) =>
				item.cartKey === cartKey ? { ...item, quantity: newQuantity } : item,
			),
		)
	}

	// Remove from cart
	const removeFromCart = (productId, selectedSize) => {
		const cartKey = `${productId}-${selectedSize}`
		setCart((prev) => prev.filter((item) => item.cartKey !== cartKey))
	}

	// Clear entire cart
	const clearCart = () => {
		setCart([])
	}

	// Total price (memoized for performance)
	const totalPrice = useMemo(() => {
		return cart.reduce(
			(acc, item) => acc + (item.offer_price ?? item.price) * item.quantity,
			0,
		)
	}, [cart])

	return (
		<CartContext.Provider
			value={{
				cart,
				addToCart,
				updateQuantity,
				removeFromCart,
				clearCart,
				totalPrice,
			}}
		>
			{children}
		</CartContext.Provider>
	)
}

export const useCartContext = () => useContext(CartContext)

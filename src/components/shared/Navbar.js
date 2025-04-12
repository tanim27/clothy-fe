'use client'

import Navdrawer from '@/components/customElements/Navdrawer'
import SearchOverlay from '@/components/customElements/SearchOverlay'
import { useGetProducts } from '@/hooks/useProduct'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded'
import DragHandleRoundedIcon from '@mui/icons-material/DragHandleRounded'
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import ShoppingCartCheckoutRoundedIcon from '@mui/icons-material/ShoppingCartCheckoutRounded'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { enqueueSnackbar } from 'notistack'
import { useState } from 'react'
import FilterProductDrawer from '../customElements/FilterProductDrawer'

const Navbar = () => {
	const { data: session, status } = useSession()
	const { data: products, isLoading, isError } = useGetProducts()
	const [isOverlayOpen, setIsOverlayOpen] = useState(false)
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false)

	const handleSearchOverlayClick = () => {
		setIsOverlayOpen(!isOverlayOpen)
	}

	const handleMenuClick = () => {
		setIsMenuOpen(!isMenuOpen)
	}

	const handleFilterMenuClick = () => {
		setIsFilterMenuOpen(!isFilterMenuOpen)
	}

	const handleAdminLogout = async () => {
		setTimeout(() => {
			signOut({ callbackUrl: '/' })
		}, 3000)
		enqueueSnackbar('Logged out successfully.', { variant: 'success' })
	}

	return (
		<div>
			<nav className='bg-[#1A1A1D] p-4'>
				<div className='bg-[#1A1A1D] container mx-auto flex justify-between items-center'>
					<h1 className='text-white text-3xl xl:text-4xl font-extrabold'>
						Clothy
					</h1>

					{/* <ul className='flex justify-center items-center space-x-8'>
						{products &&
							Array.from(
								new Set(products.map((product) => product.category)),
							).map((category, index) => (
								<li key={index}>
									<Link
										href={`/products?category=${category.toLowerCase()}`}
										className='text-white cursor-pointer capitalize'
									>
										{category}
									</Link>
								</li>
							))}
					</ul> */}

					<ul className='hidden md:flex justify-center items-center space-x-8'>
						<li>
							<Link
								href='/products'
								className='text-sm text-white cursor-pointer'
							>
								Products
							</Link>
						</li>
						<li>
							<Link
								href='/track-order'
								className='text-sm text-white cursor-pointer'
							>
								Track Order
							</Link>
						</li>
						<li>
							<button
								className='text-white cursor-pointer'
								onClick={handleSearchOverlayClick}
							>
								<SearchRoundedIcon />
							</button>
						</li>
						<li>
							<Link
								href='/'
								className='text-white cursor-pointer'
							>
								<HomeRoundedIcon />
							</Link>
						</li>

						{status === 'authenticated' ? (
							<li>
								<Link
									href='/cart'
									className='text-white cursor-pointer'
								>
									<ShoppingCartCheckoutRoundedIcon />
								</Link>
							</li>
						) : (
							<li>
								<Link
									href='/login'
									className='text-white cursor-pointer'
								>
									<ShoppingCartCheckoutRoundedIcon />
								</Link>
							</li>
						)}

						{status === 'authenticated' ? (
							<button
								onClick={handleAdminLogout}
								className='text-white cursor-pointer'
							>
								<LogoutRoundedIcon />
							</button>
						) : (
							<li>
								<Link
									href='/login'
									className='text-white cursor-pointer'
								>
									<AccountCircleRoundedIcon />
								</Link>
							</li>
						)}
					</ul>

					<ul className='md:hidden flex justify-center items-center space-x-8'>
						<li>
							<button
								className='text-white cursor-pointer'
								onClick={handleSearchOverlayClick}
							>
								<SearchRoundedIcon fontSize='medium' />
							</button>
						</li>

						<li>
							<button
								className='text-white cursor-pointer'
								onClick={handleFilterMenuClick}
							>
								<FilterAltRoundedIcon fontSize='medium' />
							</button>
						</li>

						<li>
							<button
								className='text-white cursor-pointer'
								onClick={handleMenuClick}
							>
								<DragHandleRoundedIcon fontSize='large' />
							</button>
						</li>
					</ul>
				</div>
			</nav>
			<SearchOverlay
				isOpen={isOverlayOpen}
				onClose={handleSearchOverlayClick}
			/>
			<FilterProductDrawer
				isFilterMenuOpen={isFilterMenuOpen}
				onFilterClose={handleFilterMenuClick}
			/>
			<Navdrawer
				isOpen={isMenuOpen}
				onClose={handleMenuClick}
			/>
		</div>
	)
}

export default Navbar

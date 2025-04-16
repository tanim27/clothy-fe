'use client'

import Navdrawer from '@/components/customElements/Navdrawer'
import SearchOverlay from '@/components/customElements/SearchOverlay'
import { useGetProducts } from '@/hooks/useProduct'
import { useCartContext } from '@/providers/CartProvider'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded'
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded'
import DragHandleRoundedIcon from '@mui/icons-material/DragHandleRounded'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import ShoppingCartCheckoutRoundedIcon from '@mui/icons-material/ShoppingCartCheckoutRounded'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import { useState } from 'react'

const Navbar = () => {
	const pathname = usePathname()
	const isHomePage = pathname === '/'

	const { data: session, status } = useSession()
	const { data: products, isLoading, isError } = useGetProducts()
	const [isOverlayOpen, setIsOverlayOpen] = useState(false)
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false)
	const { totalQuantity } = useCartContext()

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
			<nav
				className={`w-full z-50 transition-colors duration-300 text-[#FDFAF6] uppercase p-4 ${
					isHomePage ? 'absolute top-0 left-0' : 'bg-[#1A1A1D] shadow-xl'
				}`}
			>
				<div className='container mx-auto flex justify-between items-center'>
					<h1 className=' text-2xl xl:text-3xl font-extrabold'>Clothy</h1>

					<ul className='hidden md:flex justify-center items-center space-x-8'>
						<li>
							<Link
								href='/products'
								className='text-sm  cursor-pointer'
							>
								Products
							</Link>
						</li>
						<li>
							<Link
								href='/track-order'
								className='text-sm  cursor-pointer'
							>
								Track Order
							</Link>
						</li>

						{status === 'authenticated' ? (
							<li>
								<Link
									href='/user'
									className='text-sm  cursor-pointer'
								>
									Profile
								</Link>
							</li>
						) : (
							<li>
								<Link
									href='/login'
									className='text-sm  cursor-pointer'
								>
									Profile
								</Link>
							</li>
						)}

						<li>
							<button
								className=' cursor-pointer'
								onClick={handleSearchOverlayClick}
							>
								<SearchRoundedIcon />
							</button>
						</li>
						<li>
							<Link
								href='/'
								className=' cursor-pointer'
							>
								<HomeRoundedIcon />
							</Link>
						</li>

						{status === 'authenticated' ? (
							<li>
								<Link
									href='/cart'
									className=' cursor-pointer'
								>
									<ShoppingCartCheckoutRoundedIcon />

									{totalQuantity > 0 && (
										<span className='-top-2 -right-2 bg-[#FDFAF6] text-[#1A1A1D] text-xs font-bold rounded-full px-1.5 py-0.5'>
											{totalQuantity}
										</span>
									)}
								</Link>
							</li>
						) : (
							<li>
								<Link
									href='/login'
									className=' cursor-pointer'
								>
									<ShoppingCartCheckoutRoundedIcon />
								</Link>
							</li>
						)}

						{status === 'authenticated' ? (
							<button
								onClick={handleAdminLogout}
								className=' cursor-pointer'
							>
								<LogoutRoundedIcon />
							</button>
						) : (
							<li>
								<Link
									href='/login'
									className=' cursor-pointer'
								>
									<AccountCircleRoundedIcon />
								</Link>
							</li>
						)}
					</ul>

					<ul className='md:hidden flex justify-center items-center space-x-8'>
						<li>
							<button
								className='cursor-pointer'
								onClick={handleSearchOverlayClick}
							>
								<SearchRoundedIcon fontSize='small' />
							</button>
						</li>

						<li>
							<Link
								href='/products'
								className='cursor-pointer'
							>
								<CategoryRoundedIcon fontSize='small' />
							</Link>
						</li>

						<li>
							<Link
								href='/'
								className='cursor-pointer'
							>
								<HomeRoundedIcon fontSize='small' />
							</Link>
						</li>

						{status === 'authenticated' ? (
							<li>
								<Link
									href='/cart'
									className='cursor-pointer'
								>
									<ShoppingCartCheckoutRoundedIcon fontSize='small' />

									{totalQuantity > 0 && (
										<span className='-top-2 -right-2 bg-[#FDFAF6] text-[#1A1A1D] text-xs font-bold rounded-full px-1.5 py-0.5'>
											{totalQuantity}
										</span>
									)}
								</Link>
							</li>
						) : (
							<li>
								<Link
									href='/login'
									className='cursor-pointer'
								>
									<ShoppingCartCheckoutRoundedIcon fontSize='small' />
								</Link>
							</li>
						)}

						<li>
							<button
								className='cursor-pointer'
								onClick={handleMenuClick}
							>
								<DragHandleRoundedIcon fontSize='medium' />
							</button>
						</li>
					</ul>
				</div>
			</nav>
			<SearchOverlay
				isOpen={isOverlayOpen}
				onClose={handleSearchOverlayClick}
			/>
			<Navdrawer
				isOpen={isMenuOpen}
				onClose={handleMenuClick}
			/>
		</div>
	)
}

export default Navbar

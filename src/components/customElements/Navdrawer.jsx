'use client'

import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded'
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import LoginRoundedIcon from '@mui/icons-material/LoginRounded'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import ShoppingCartCheckoutRoundedIcon from '@mui/icons-material/ShoppingCartCheckoutRounded'
import TroubleshootRoundedIcon from '@mui/icons-material/TroubleshootRounded'
import gsap from 'gsap'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { enqueueSnackbar } from 'notistack'
import { useEffect, useRef } from 'react'

const Navdrawer = ({ isOpen, onClose }) => {
	const { data: session, status } = useSession()
	const drawerRef = useRef(null)

	useEffect(() => {
		if (isOpen) {
			gsap.to(drawerRef.current, {
				x: 0,
				duration: 0.5,
				ease: 'power3.out',
			})
		} else {
			gsap.to(drawerRef.current, {
				x: '100%',
				duration: 0.5,
				ease: 'power3.in',
			})
		}
	}, [isOpen])

	const handleAdminLogout = async () => {
		onClose()
		setTimeout(() => {
			signOut({ callbackUrl: '/' })
		}, 3000)
		enqueueSnackbar('Logged out successfully.', { variant: 'success' })
	}

	return (
		<>
			{isOpen && (
				<div
					className='fixed inset-0 bg-black/50 backdrop-blur-sm z-40'
					onClick={onClose}
				/>
			)}

			<div
				ref={drawerRef}
				className='fixed top-0 right-0 h-full w-[80%] sm:w-[350px] z-50 transform p-6 bg-white/30 backdrop-blur-md shadow-2xl rounded-l-2xl flex flex-col'
				style={{ transform: 'translateX(100%)' }}
			>
				<div className='flex justify-end'>
					<button
						onClick={onClose}
						className='text-[#1A1A1D] hover:text-red-500 transition duration-300 cursor-pointer'
					>
						<CloseRoundedIcon fontSize='small' />
					</button>
				</div>

				<ul className='flex flex-col items-center gap-6 mt-10'>
					<li>
						<Link
							href='/products'
							className='flex items-center gap-2 text-[#1A1A1D] hover:text-[#FDFAF6]'
							onClick={onClose}
						>
							<CategoryRoundedIcon />
							<span>Products</span>
						</Link>
					</li>

					<li>
						<Link
							href='/track-order'
							className='flex items-center gap-2 text-[#1A1A1D] hover:text-[#FDFAF6]'
							onClick={onClose}
						>
							<TroubleshootRoundedIcon />
							<span>Track Order</span>
						</Link>
					</li>

					{status === 'authenticated' ? (
						<li>
							<Link
								href='/user'
								className='flex items-center gap-2 text-[#1A1A1D] hover:text-[#FDFAF6]'
								onClick={onClose}
							>
								<AccountCircleRoundedIcon />
								<span>Profile</span>
							</Link>
						</li>
					) : (
						<li>
							<Link
								href='/'
								className='flex items-center gap-2 text-[#1A1A1D] hover:text-[#FDFAF6]'
								onClick={onClose}
							>
								<AccountCircleRoundedIcon />
								<span>Profile</span>
							</Link>
						</li>
					)}

					<li>
						<Link
							href='/'
							className='flex items-center gap-2 text-[#1A1A1D] hover:text-[#FDFAF6]'
							onClick={onClose}
						>
							<HomeRoundedIcon />
							<span>Home</span>
						</Link>
					</li>

					{status === 'authenticated' ? (
						<li>
							<Link
								href='/cart'
								className='flex items-center gap-2 text-[#1A1A1D] hover:text-[#FDFAF6]'
								onClick={onClose}
							>
								<ShoppingCartCheckoutRoundedIcon />
								<span>Cart</span>
							</Link>
						</li>
					) : (
						<li>
							<Link
								href='/login'
								className='flex items-center gap-2 text-[#1A1A1D] hover:text-[#FDFAF6]'
								onClick={onClose}
							>
								<ShoppingCartCheckoutRoundedIcon />
								<span>Cart</span>
							</Link>
						</li>
					)}

					{status === 'authenticated' ? (
						<>
							<li>
								<button
									onClick={handleAdminLogout}
									className='flex items-center gap-2 text-[#1A1A1D] hover:text-[#FDFAF6] cursor-pointer'
								>
									<LogoutRoundedIcon />
									<span>Logout</span>
								</button>
							</li>
						</>
					) : (
						<li>
							<Link
								href='/login'
								className='flex items-center gap-2 text-[#1A1A1D] hover:text-[#FDFAF6] cursor-pointer'
								onClick={onClose}
							>
								<LoginRoundedIcon />
								<span>Login</span>
							</Link>
						</li>
					)}
				</ul>

				<div className='mt-auto text-center text-xs text-[#1A1A1D] pt-10'>
					&copy; {new Date().getFullYear()} Clothy. All rights reserved.
				</div>
			</div>
		</>
	)
}

export default Navdrawer

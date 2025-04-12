import {
	Facebook,
	Instagram,
	Reddit,
	Twitter,
	YouTube,
} from '@mui/icons-material'
import Link from 'next/link'

const Footer = () => {
	return (
		<div className='bg-[#f6f6f6]'>
			<footer className='text-[#1a1a1d] uppercase py-12'>
				{/* Newsletter Section */}
				<div className='mb-20 max-w-4xl mx-auto px-6 text-center'>
					<h3 className='text-3xl md:text-4xl font-bold text-black uppercase'>
						Stay Connected
					</h3>
					<p className='text-gray-700 mt-4 text-lg'>
						Subscribe to get updates on new collections and exclusive offers.
					</p>

					<form className='mt-12 flex flex-col md:flex-row justify-center items-center gap-6'>
						<div className='relative w-full md:w-[30rem]'>
							<input
								type='email'
								placeholder='Enter your email'
								className='text-2xl md:text-3xl border-b-2 border-gray-300 outline-none focus:border-black transition w-full pr-12 placeholder:text-gray-400 text-gray-800'
							/>
						</div>

						<button
							type='submit'
							className='bg-[#1a1a1d] text-white px-6 py-3 rounded-full hover:bg-[#333333] transition-all duration-300 shadow-md hover:scale-105 cursor-pointer'
						>
							Subscribe
						</button>
					</form>
				</div>

				<div className='max-w-7xl mx-auto px-8 py-10 grid grid-cols-1 md:grid-cols-3 gap-8  border-t border-b border-gray-200'>
					{/* Information Section */}
					<div>
						<h4 className='text-lg font-bold mb-4 text-[#1a1a1d] uppercase'>
							Information
						</h4>
						<ul className='space-y-2 font-bold'>
							<li>
								<a
									href='#'
									className='hover:text-[#1a1a1d] text-sm uppercase transition duration-300 relative after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#1a1a1d] after:transition-all after:duration-300 hover:after:w-full'
								>
									Deliveries
								</a>
							</li>
							<li>
								<a
									href='#'
									className='hover:text-[#1a1a1d] text-sm uppercase transition duration-300 relative after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#1a1a1d] after:transition-all after:duration-300 hover:after:w-full'
								>
									Shipping FAQ
								</a>
							</li>
							<li>
								<a
									href='#'
									className='hover:text-[#1a1a1d] text-sm uppercase transition duration-300 relative after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#1a1a1d] after:transition-all after:duration-300 hover:after:w-full'
								>
									Terms & Conditions
								</a>
							</li>
							<li>
								<a
									href='#'
									className='hover:text-[#1a1a1d] text-sm uppercase transition duration-300 relative after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#1a1a1d] after:transition-all after:duration-300 hover:after:w-full'
								>
									Privacy Policy
								</a>
							</li>
						</ul>
					</div>

					{/* About Us Section */}
					<div>
						<h4 className='text-lg font-bold mb-4 text-[#1a1a1d] uppercase'>
							About Us
						</h4>
						<ul className='space-y-2 font-bold'>
							<li>
								<a
									href='#'
									className='hover:text-[#1a1a1d] text-sm uppercase transition duration-300 relative after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#1a1a1d] after:transition-all after:duration-300 hover:after:w-full'
								>
									Goals
								</a>
							</li>
							<li>
								<a
									href='#'
									className='hover:text-[#1a1a1d] text-sm uppercase transition duration-300 relative after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#1a1a1d] after:transition-all after:duration-300 hover:after:w-full'
								>
									Careers
								</a>
							</li>
							<li>
								<a
									href='#'
									className='hover:text-[#1a1a1d] text-sm uppercase transition duration-300 relative after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#1a1a1d] after:transition-all after:duration-300 hover:after:w-full'
								>
									Company
								</a>
							</li>
							<li>
								<a
									href='#'
									className='hover:text-[#1a1a1d] text-sm uppercase transition duration-300 relative after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#1a1a1d] after:transition-all after:duration-300 hover:after:w-full'
								>
									Factory
								</a>
							</li>
						</ul>
					</div>

					{/* Address Section */}
					<div>
						<h4 className='text-lg font-bold mb-4 text-[#1a1a1d] uppercase'>
							Address
						</h4>
						<ul className='space-y-2 font-bold'>
							<li className='text-sm uppercase'>Find a location nearest you</li>
							<li>
								<a
									href='/stores'
									className='hover:text-[#1a1a1d] text-sm uppercase transition duration-300 relative after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#1a1a1d] after:transition-all after:duration-300 hover:after:w-full'
								>
									See Our Stores
								</a>
							</li>
							<li>
								<a
									href='tel:++9912991199'
									className='hover:text-[#1a1a1d] text-sm transition duration-300 relative after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#1a1a1d] after:transition-all after:duration-300 hover:after:w-full'
								>
									+9912991199
								</a>
							</li>
							<li>
								<a
									href='mailto:blaa@domain.com'
									className='hover:text-[#1a1a1d] text-sm transition duration-300 relative after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#1a1a1d] after:transition-all after:duration-300 hover:after:w-full'
								>
									blaa@domain.com
								</a>
							</li>
						</ul>
					</div>
				</div>

				{/* Social Media & Copyright */}
				<div className='pt-6 max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center'>
					<div className='flex space-x-4'>
						<Link
							href='#'
							className='text-[#1a1a1d] hover:text-[#1a1a1d] text-sm text-2xl transition duration-300'
						>
							<Facebook />
						</Link>
						<Link
							href='#'
							className='text-[#1a1a1d] hover:text-[#1a1a1d] text-sm text-2xl transition duration-300'
						>
							<Twitter />
						</Link>
						<Link
							href='#'
							className='text-[#1a1a1d] hover:text-[#1a1a1d] text-sm text-2xl transition duration-300'
						>
							<Instagram />
						</Link>
						<Link
							href='#'
							className='text-[#1a1a1d] hover:text-[#1a1a1d] text-sm text-2xl transition duration-300'
						>
							<Reddit />
						</Link>
						<Link
							href='#'
							className='text-[#1a1a1d] hover:text-[#1a1a1d] text-sm text-2xl transition duration-300'
						>
							<YouTube />
						</Link>
					</div>
					<p className='text-[#1a1a1d] mt-4 md:mt-0'>
						&copy; {new Date().getFullYear()} Clothy. All rights reserved.
					</p>
				</div>
			</footer>
		</div>
	)
}

export default Footer

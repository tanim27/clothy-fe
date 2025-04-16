'use client'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import gsap from 'gsap'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export default function SearchOverlay({ isOpen, onClose }) {
	const overlayRef = useRef(null)
	const [searchTerm, setSearchTerm] = useState('')
	const router = useRouter()

	const handleSearch = () => {
		if (!searchTerm.trim()) return
		router.push(`/search?query=${encodeURIComponent(searchTerm.trim())}`)
		onClose()
		setSearchTerm('')
	}

	useEffect(() => {
		const overlay = overlayRef.current

		if (!overlay) return

		if (isOpen) {
			overlay.style.display = 'flex'
			gsap.fromTo(
				overlay,
				{ opacity: 0, y: 50 },
				{ opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
			)
		} else {
			gsap.to(overlay, {
				opacity: 0,
				y: 0,
				duration: 0.4,
				ease: 'power3.in',
				onComplete: () => {
					overlay.style.display = 'none'
				},
			})
		}
	}, [isOpen])

	return (
		<div
			ref={overlayRef}
			style={{ display: 'none' }}
			className='fixed inset-0 bg-white flex flex-col items-center justify-center z-50'
		>
			<h3 className='font-bold text-3xl md:text-4xl text-center uppercase'>
				What Are You Looking For?
			</h3>

			{/* Input with icon */}
			<div className='relative mt-16 w-2/3 max-w-xl'>
				<input
					type='text'
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === 'Enter') handleSearch()
					}}
					placeholder='Search here.....'
					className='text-3xl md:text-4xl text-start border-b-2 border-gray-300 outline-none focus:border-black transition w-full pr-12'
				/>
				<SearchRoundedIcon
					onClick={handleSearch}
					className='absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer hover:text-black'
					fontSize='large'
				/>
			</div>

			{/* Close button */}
			<button
				onClick={onClose}
				className='absolute bottom-6 flex items-center justify-center bg-[#333333] text-white rounded-full w-10 h-10 cursor-pointer'
			>
				<CloseRoundedIcon />
			</button>
		</div>
	)
}

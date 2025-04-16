'use client'

import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Autoplay, EffectFade, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

const slides = [
	{
		id: 1,
		image: '/images/background1.jpg',
		text: 'Welcome to Clothy - Style Redefined',
	},
	{
		id: 2,
		image: '/images/background2.jpg',
		text: 'Shop the Trendiest Outfits',
	},
	{
		id: 3,
		image: '/images/background3.jpg',
		text: 'Unmatched Comfort & Elegance',
	},
	{
		id: 4,
		image: '/images/background4.jpg',
		text: 'Step into Style with Clothy',
	},
	{
		id: 5,
		image: '/images/background5.jpg',
		text: 'Discover the Latest Fashion Trends',
	},
	{
		id: 6,
		image: '/images/background6.jpg',
		text: 'Where Comfort Meets Elegance',
	},
]

export default function HeroCarousel() {
	return (
		<div className='w-full h-full'>
			<Swiper
				modules={[Pagination, Autoplay, EffectFade]}
				effect='fade'
				slidesPerView={1}
				pagination={{ clickable: true }}
				autoplay={{ delay: 2000, disableOnInteraction: false }}
				loop
				speed={1000}
				className='h-screen'
			>
				{slides.map((slide) => (
					<SwiperSlide key={slide.id}>
						<div className='relative w-full h-full'>
							<img
								src={slide.image}
								alt={slide.text}
								className='w-full h-full object-cover transition-opacity duration-1000'
							/>
							<div className='absolute inset-0 bg-black/40 flex items-center justify-center'>
								<h2 className='font-extrabold text-white text-3xl md:text-5xl font-bold text-center px-4 animate-fadeZoom'>
									{slide.text}
								</h2>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	)
}

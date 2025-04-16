'use client'
import 'swiper/css'
import 'swiper/css/effect-fade'
import { Autoplay, EffectFade } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

const videos = [
	{ id: 1, src: '/videos/background-video-1.mp4' },
	{ id: 2, src: '/videos/background-video-2.mp4' },
	{ id: 3, src: '/videos/background-video-3.mp4' },
]

const VideoCarousel = () => {
	return (
		<Swiper
			modules={[EffectFade, Autoplay]}
			effect='fade'
			autoplay={{ delay: 5000 }}
			loop={true}
			className='w-full h-screen'
		>
			{videos.map((video) => (
				<SwiperSlide key={video.id}>
					<video
						className='w-full h-full object-cover'
						src={video.src}
						autoPlay
						loop
						muted
						playsInline
					/>
				</SwiperSlide>
			))}
		</Swiper>
	)
}

export default VideoCarousel

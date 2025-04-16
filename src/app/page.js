import HeroCarousel from '@/components/carousel/HeroCarousel'
import VideoCarousel from '@/components/carousel/VideoCarousel'

const HomePage = () => {
	return (
		<div className='min-h-screen'>
			<HeroCarousel />
			<VideoCarousel />
		</div>
	)
}

export default HomePage

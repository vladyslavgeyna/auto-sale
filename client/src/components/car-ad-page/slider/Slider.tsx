import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules'
import { Swiper } from 'swiper/react'
import 'swiper/swiper-bundle.css'

import Slide from './Slide'
import './Slider.css'

const Slider = ({ images }: { images: string[] }) => {
	return (
		<Swiper
			className='rounded-lg h-[250px] sm:h-[300px] md:h-[400px] lg:h-[550px]'
			modules={[Navigation, Pagination, Scrollbar, A11y]}
			spaceBetween={50}
			centeredSlides={true}
			slidesPerView={1}
			loop
			navigation={{
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			}}
			pagination={{ clickable: true }}
			scrollbar={{ draggable: true }}>
			{images.map((image, index) => (
				<Slide key={index} image={image} index={index} />
			))}
			<div className='slider-controller'>
				<div className='swiper-button-prev slider-arrow'>
					<IoIosArrowBack />
				</div>
				<div className='swiper-button-next slider-arrow'>
					<IoIosArrowForward />
				</div>
				<div className='swiper-pagination'></div>
			</div>
		</Swiper>
	)
}

export default Slider

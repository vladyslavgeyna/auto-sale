import Image from 'next/image'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'

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
				<SwiperSlide key={image}>
					<a
						href={image}
						target='_blank'
						className='flex items-center h-full'>
						<Image
							priority={index === 0}
							width={1280}
							height={720}
							className='lg:object-cover object-contain w-full h-full rounded-lg'
							src={image}
							alt='Car image'
						/>
					</a>
				</SwiperSlide>
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

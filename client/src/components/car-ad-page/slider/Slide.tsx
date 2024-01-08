import Image from 'next/image'
import { SwiperSlide } from 'swiper/react'

const Slide = ({ image, index }: { image: string; index: number }) => {
	return (
		<SwiperSlide key={image}>
			<a
				href={image}
				target='_blank'
				className='flex items-center w-full h-full relative'>
				<span
					style={{
						background: `url("${image}") no-repeat center`,
						backgroundSize: 'cover',
					}}
					className='absolute top-0 blur-md left-0 w-full h-full'></span>
				<Image
					priority={index === 0}
					width={1280}
					height={720}
					className='object-contain w-full h-full rounded-lg z-10 bg-opacity-0'
					src={image}
					alt='Car image'
				/>
			</a>
		</SwiperSlide>
	)
}

export default Slide

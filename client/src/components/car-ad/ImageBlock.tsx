import Image from 'next/image'
import Link from 'next/link'

type PropsType = {
	image: string
	alt: string
	carAdLink: string
}

const ImageBlock = ({ image, alt, carAdLink }: PropsType) => {
	return (
		<div
			style={{ paddingBottom: '50%' }}
			className='overflow-hidden rounded-lg relative'>
			<Link href={carAdLink}>
				<Image
					priority={true}
					className='object-cover absolute top-0 left-0 h-full w-full hover:scale-[1.03] transition-all duration-300'
					width={1280}
					height={1280}
					alt={alt}
					src={image}
				/>
			</Link>
		</div>
	)
}

export default ImageBlock

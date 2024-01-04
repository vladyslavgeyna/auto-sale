import Image from 'next/image'

type PropsType = {
	url: string
}

const ImagePreview = ({ url }: PropsType) => {
	return (
		<div className='p-2 border rounded h-full w-60'>
			<Image
				src={url}
				alt='Car image'
				width={200}
				height={200}
				className='object-contain w-full h-full'
			/>
		</div>
	)
}

export default ImagePreview

import Link from 'next/link'

type PropsType = {
	title: string
	carAdLink: string
}

const CarAdTitle = ({ carAdLink, title }: PropsType) => {
	return (
		<h2 className='font-bold text-lg'>
			<Link className='hover:underline' href={carAdLink}>
				{title}
			</Link>
		</h2>
	)
}

export default CarAdTitle

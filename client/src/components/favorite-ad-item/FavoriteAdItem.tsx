import { IFavoriteAd } from '@/types/favorite-ad/favorite-ad.interface'
import Image from 'next/image'
import Link from 'next/link'
import { FaTrash } from 'react-icons/fa6'
import { Button } from '../ui/Button'
import Characteristics from './Characteristics'
import SellerInfo from './SellerInfo'

const FavoriteAdItem = ({ favoriteAd }: { favoriteAd: IFavoriteAd }) => {
	const carAdLink = `/car-ad/${favoriteAd.carAdId}`

	return (
		<div className='h-full border rounded p-4'>
			<div className='flex flex-col md:flex-row md:items-center gap-6	'>
				<div className='md:w-[40%] lg:w-1/3'>
					<div
						style={{ paddingBottom: '50%' }}
						className='overflow-hidden rounded-lg relative'>
						<Link href={carAdLink}>
							<Image
								priority={true}
								className='object-cover absolute top-0 left-0 h-full w-full hover:scale-[1.03] transition-all duration-300'
								width={1280}
								height={1280}
								alt={favoriteAd.title}
								src={favoriteAd.image}
							/>
						</Link>
					</div>
				</div>
				<div className='md:w-[60%] lg:w-4/6 flex gap-2 flex-col justify-between self-stretch'>
					<div className='flex items-center justify-between gap-3'>
						<h2 className='font-bold text-lg'>
							<Link className='hover:underline' href={carAdLink}>
								{favoriteAd.title}
							</Link>
						</h2>
						<div
							style={{ letterSpacing: '0.5px' }}
							className='bg-primary text-white p-2 text-lg rounded-md'>
							{favoriteAd.price}$
						</div>
					</div>
					<Characteristics favoriteAd={favoriteAd} />
					<div className='flex-col sm:flex-row flex items-center justify-between gap-2'>
						<SellerInfo
							email={favoriteAd.email}
							name={favoriteAd.name}
							phone={favoriteAd.phone}
							surname={favoriteAd.surname}
						/>
						<div className='self-stretch'>
							<Button className='flex items-center gap-2 w-full'>
								<FaTrash />
								<span>Remove from favorites</span>
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default FavoriteAdItem

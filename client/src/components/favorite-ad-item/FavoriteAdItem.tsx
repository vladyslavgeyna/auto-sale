import { useToggleFavoriteAd } from '@/hooks/useToggleFavoriteAd'
import { IFavoriteAd } from '@/types/favorite-ad/favorite-ad.interface'
import { Loader2 } from 'lucide-react'
import { FaTrash } from 'react-icons/fa6'
import CarAdTitle from '../car-ad/CarAdTitle'
import Characteristics from '../car-ad/Characteristics'
import ImageBlock from '../car-ad/ImageBlock'
import { Button } from '../ui/Button'
import SellerInfo from './SellerInfo'

const FavoriteAdItem = ({ favoriteAd }: { favoriteAd: IFavoriteAd }) => {
	const carAdLink = `/car-ad/${favoriteAd.carAdId}`

	const { mutate: toggle, isPending } = useToggleFavoriteAd(
		favoriteAd.carAdId,
	)

	const handleOnRemoveFavoriteAd = () => {
		toggle(favoriteAd.carAdId)
	}

	return (
		<div className='h-full border rounded p-4'>
			<div className='flex flex-col md:flex-row md:items-center gap-6	'>
				<div className='md:w-[40%] lg:w-1/3'>
					<ImageBlock
						image={favoriteAd.image}
						alt={favoriteAd.title}
						carAdLink={carAdLink}
					/>
				</div>
				<div className='md:w-[60%] lg:w-4/6 flex gap-2 flex-col justify-between self-stretch'>
					<div className='flex items-center justify-between gap-3'>
						<CarAdTitle
							carAdLink={carAdLink}
							title={favoriteAd.title}
						/>
						<div
							style={{ letterSpacing: '0.5px' }}
							className='bg-primary text-white p-2 text-lg rounded-md'>
							{favoriteAd.price}$
						</div>
					</div>
					<Characteristics
						fuel={favoriteAd.fuel}
						engineCapacity={favoriteAd.engineCapacity}
						mileage={favoriteAd.mileage}
						region={favoriteAd.region}
						transmission={favoriteAd.transmission}
						wheelDrive={favoriteAd.wheelDrive}
					/>
					<div className='flex-col sm:flex-row flex items-center justify-between gap-2'>
						<SellerInfo
							email={favoriteAd.email}
							name={favoriteAd.name}
							phone={favoriteAd.phone}
							surname={favoriteAd.surname}
						/>
						<div className='self-stretch'>
							<Button
								type='button'
								onClick={handleOnRemoveFavoriteAd}
								className='flex items-center gap-2 w-full min-w-[229px]'>
								{isPending ? (
									<Loader2 className='animate-spin h-6 w-6' />
								) : (
									<>
										<FaTrash />
										<span>Remove from favorites</span>
									</>
								)}
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default FavoriteAdItem

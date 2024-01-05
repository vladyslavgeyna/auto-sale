import { ICarAd } from '@/types/car-ad/car-ad.interface'
import CarAdItem from '../car-ad-item/CarAdItem'

type PropsType = {
	carAds: ICarAd[]
}

const CarAdsList = ({ carAds }: PropsType) => {
	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
			{carAds.map(carAd => (
				<CarAdItem key={carAd.id} carAd={carAd} />
			))}
		</div>
	)
}

export default CarAdsList

import { IGetAllUserCarAd } from '@/types/car-ad/get-user-car-ads-output.interface'
import MyAdItem from '../my-ad-item/MyAdItem'

const MyAdsList = ({ carAds }: { carAds: IGetAllUserCarAd[] }) => {
	return (
		<div className='flex flex-col gap-5'>
			{carAds.map(carAd => (
				<MyAdItem key={carAd.id} carAd={carAd} />
			))}
		</div>
	)
}

export default MyAdsList

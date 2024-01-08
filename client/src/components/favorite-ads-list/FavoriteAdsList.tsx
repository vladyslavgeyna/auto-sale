import { IFavoriteAd } from '@/types/favorite-ad/favorite-ad.interface'
import FavoriteAdItem from '../favorite-ad-item/FavoriteAdItem'

const FavoriteAdsList = ({ favoriteAds }: { favoriteAds: IFavoriteAd[] }) => {
	return (
		<div className='flex flex-col gap-5'>
			{favoriteAds.map(favoriteAd => (
				<FavoriteAdItem
					key={favoriteAd.carAdId}
					favoriteAd={favoriteAd}
				/>
			))}
		</div>
	)
}

export default FavoriteAdsList

import FavoriteAdDto from './favorite-ad.dto'

export default interface GetAllFavoriteAdsOutputDto {
	count: number

	favoriteAds: FavoriteAdDto[]
}

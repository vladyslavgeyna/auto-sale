import { IFavoriteAd } from './favorite-ad.interface'

export interface IGetFavoriteAdsOutput {
	favoriteAds: IFavoriteAd[]
	count: number
}

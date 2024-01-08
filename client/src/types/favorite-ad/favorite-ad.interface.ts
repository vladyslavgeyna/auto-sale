import { ICarAd } from '../car-ad/car-ad.interface'

export interface IFavoriteAd extends Omit<ICarAd, 'id'> {
	region: string
	phone: string | null
	email: string
	name: string
	carAdId: number
	surname: string
}

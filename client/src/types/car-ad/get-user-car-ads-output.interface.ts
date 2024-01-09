import { ICarAd } from './car-ad.interface'

export type IGetAllUserCarAd = ICarAd & {
	region: string
	dateOfCreation: string
	isActive: boolean
	userName: string
	userSurname: string
}

export default interface IGetAllUserCarAdsOutput {
	count: number

	carAds: IGetAllUserCarAd[]
}

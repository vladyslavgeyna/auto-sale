import { CarAdDto } from './car-ad.dto'

export type GetAllUserCarAdDto = CarAdDto & {
	region: string
	dateOfCreation: string
	isActive: boolean
	userName: string
	userSurname: string
}

export default interface GetAllUserCarAdsOutputDto {
	count: number

	carAds: GetAllUserCarAdDto[]
}

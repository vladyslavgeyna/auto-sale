import { CarAdDto } from './car-ad.dto'

export interface GetAllCarAdsOutputDto {
	carAds: CarAdDto[]
	count: number
}

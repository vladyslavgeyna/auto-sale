import { ICarAd } from '../car-ad/car-ad.interface'

export interface ICarComparison extends Omit<ICarAd, 'id'> {
	region: string
	additionalOptions: string | null
	numberOfSeats: number
	color: string
	carBrandName: string
	carModelName: string
	carAdId: number
	yearOfProduction: number
}

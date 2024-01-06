import { ICarAd } from './car-ad.interface'

export interface IGetCarAdByIdOutput extends Omit<ICarAd, 'image'> {
	title: string
	text: string
	dateOfCreation: string
	price: number
	carBrand: string
	carModel: string
	yearOfProduction: number
	color: string
	numberOfSeats: number
	additionalOptions: string | null
	region: string
	images: string[]
	userId: string
	isActive: boolean
	userName: string
	userSurname: string
	userPhone: string | null
	userEmail: string
	userImage: string | null
}

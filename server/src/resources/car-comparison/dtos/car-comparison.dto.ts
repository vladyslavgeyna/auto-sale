import { CarAdDto } from '../../car-ad/dtos/car-ad.dto'

interface CarComparisonDto extends Omit<CarAdDto, 'id'> {
	region: string
	additionalOptions: string | null
	numberOfSeats: number
	color: string
	carBrandName: string
	carModelName: string
	carAdId: number
	yearOfProduction: number
}

export default CarComparisonDto

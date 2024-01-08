import { CarAdDto } from '../../car-ad/dtos/car-ad.dto'

interface FavoriteAdDto extends Omit<CarAdDto, 'id'> {
	region: string
	phone: string | null
	email: string
	name: string
	carAdId: number
	surname: string
}

export default FavoriteAdDto

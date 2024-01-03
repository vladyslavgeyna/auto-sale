import { Car } from '../../car/car.entity'
import { Image } from '../../image/image.entity'

export default interface CreateCarImageInputDto {
	image: Image

	car: Car

	isMain: boolean
}

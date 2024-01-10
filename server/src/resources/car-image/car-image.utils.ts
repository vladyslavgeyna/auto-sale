import { FindManyOptions } from 'typeorm'
import { CarImage } from './car-image.entity'

export const deleteCarImageOptions = (
	carId: number,
): FindManyOptions<CarImage> => ({
	relations: {
		image: true,
	},
	where: { car: { id: carId } },
	select: {
		id: true,
		image: {
			name: true,
		},
	},
})

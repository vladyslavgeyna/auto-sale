import { FindManyOptions } from 'typeorm'
import { CarComparison } from './car-comparison.entity'

export const getAllCarComparisonsOptions = (
	userId: string,
): FindManyOptions<CarComparison> => ({
	where: {
		user: { id: userId },
		carAd: { isActive: true, car: { carImages: { isMain: true } } },
	},
	relations: {
		carAd: {
			car: {
				carBrand: true,
				carModel: true,
				carImages: {
					image: true,
				},
			},
		},
	},
	select: {
		id: true,
		carAd: {
			id: true,
			title: true,
			car: {
				carBrand: {
					name: true,
				},
				carModel: {
					name: true,
				},
				yearOfProduction: true,
				price: true,
				wheelDrive: true,
				region: true,
				transmission: true,
				mileage: true,
				engineCapacity: true,
				fuel: true,
				color: true,
				numberOfSeats: true,
				additionalOptions: true,
				carImages: {
					id: true,
					image: {
						name: true,
					},
				},
			},
		},
	},
})

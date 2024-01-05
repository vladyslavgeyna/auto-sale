import { FindManyOptions } from 'typeorm'
import { CarAd } from './car-ad.entity'

export const getAllCarAdsOptions: FindManyOptions<CarAd> = {
	relations: {
		car: {
			carImages: {
				image: true,
			},
		},
	},
	select: {
		id: true,
		title: true,
		car: {
			engineCapacity: true,
			price: true,
			transmission: true,
			wheelDrive: true,
			fuel: true,
			mileage: true,
			carImages: true,
		},
	},
	where: {
		car: {
			carImages: {
				isMain: true,
			},
		},
	},
}

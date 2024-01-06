import { FindManyOptions, FindOneOptions } from 'typeorm'
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
		isActive: true,
	},
}

export const getCarAdByIdOptions = (
	carAdId: number,
): FindOneOptions<CarAd> => ({
	where: {
		id: carAdId,
	},
	relations: {
		car: {
			carBrand: true,
			carModel: true,
			carImages: {
				image: true,
			},
		},
		user: {
			image: true,
		},
	},
	order: {
		car: {
			carImages: {
				isMain: 'DESC',
			},
		},
	},
	select: {
		isActive: true,
		id: true,
		title: true,
		text: true,
		dateOfCreation: true,
		user: {
			id: true,
			image: {
				name: true,
			},
			name: true,
			phone: true,
			email: true,
			surname: true,
		},
		car: {
			carBrand: {
				name: true,
			},
			carModel: {
				name: true,
			},
			color: true,
			region: true,
			yearOfProduction: true,
			numberOfSeats: true,
			additionalOptions: true,
			engineCapacity: true,
			price: true,
			transmission: true,
			wheelDrive: true,
			fuel: true,
			mileage: true,
			carImages: {
				id: true,
				isMain: true,
				image: {
					name: true,
				},
			},
		},
	},
})

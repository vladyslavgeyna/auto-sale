import { FindManyOptions } from 'typeorm'
import { FavoriteAd } from './favorite-ad.entity'

export const getAllFavoriteAdsOptions = (
	userId: string,
): FindManyOptions<FavoriteAd> => ({
	where: {
		user: { id: userId },
		carAd: { isActive: true, car: { carImages: { isMain: true } } },
	},
	relations: {
		carAd: {
			user: true,
			car: {
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
			user: {
				name: true,
				surname: true,
				email: true,
				phone: true,
			},
			car: {
				price: true,
				wheelDrive: true,
				region: true,
				transmission: true,
				mileage: true,
				engineCapacity: true,
				fuel: true,
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

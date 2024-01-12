import {
	Between,
	FindManyOptions,
	FindOneOptions,
	FindOptionsOrder,
	FindOptionsOrderValue,
	LessThanOrEqual,
	MoreThanOrEqual,
} from 'typeorm'
import { Car } from '../car/car.entity'
import { CarAd } from './car-ad.entity'
import { GetAllCarAdsInputDto } from './dtos/get-all-car-ads-input.dto'
import { CarAdsOrderByOptions } from './enums/car-ad-order-by-options.enum'

export interface GetAllCarAdsOptionsInputType
	extends Omit<Omit<GetAllCarAdsInputDto, 'limit'>, 'page'> {
	offset: number
	limit: number
}

export const getAllCarAdsOptions = (
	getAllOptionsData: GetAllCarAdsOptionsInputType,
): FindManyOptions<CarAd> => {
	const carBrandId = Number(getAllOptionsData.carBrandId) || undefined
	const carModelId = Number(getAllOptionsData.carModelId) || undefined
	const region = Number(getAllOptionsData.region) || undefined
	const yearFrom = Number(getAllOptionsData.yearFrom) || undefined
	const yearTo = Number(getAllOptionsData.yearTo) || undefined
	const priceFrom = Number(getAllOptionsData.priceFrom) || undefined
	const priceTo = Number(getAllOptionsData.priceTo) || undefined
	const orderBy = Number(getAllOptionsData.orderBy) || undefined

	type OrderByOptionsType = {
		[key in CarAdsOrderByOptions]:
			| FindOptionsOrderValue
			| FindOptionsOrder<Car>
			| undefined
	}

	const orderByOptions: OrderByOptionsType | undefined = {
		[CarAdsOrderByOptions['By default']]: undefined,
		[CarAdsOrderByOptions['From cheap to expensive']]: { price: 'ASC' },
		[CarAdsOrderByOptions['From expensive to cheap']]: { price: 'DESC' },
		[CarAdsOrderByOptions['Mileage, ascending']]: { mileage: 'ASC' },
		[CarAdsOrderByOptions['Mileage, descending']]: { mileage: 'DESC' },
		[CarAdsOrderByOptions['Year of production, ascending']]: {
			yearOfProduction: 'ASC',
		},
		[CarAdsOrderByOptions['Year of production, descending']]: {
			yearOfProduction: 'DESC',
		},
	}

	return {
		skip: getAllOptionsData.offset,
		take: getAllOptionsData.limit,
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
				yearOfProduction: true,
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
				carBrand: { id: carBrandId },
				carModel: { id: carModelId },
				region: region,
				yearOfProduction:
					yearFrom && yearTo
						? Between(yearFrom, yearTo)
						: yearTo && !yearFrom
						? LessThanOrEqual(yearTo)
						: !yearTo && yearFrom
						? MoreThanOrEqual(yearFrom)
						: undefined,
				price:
					priceFrom && priceTo
						? Between(priceFrom, priceTo)
						: priceTo && !priceFrom
						? LessThanOrEqual(priceTo)
						: !priceTo && priceFrom
						? MoreThanOrEqual(priceFrom)
						: undefined,
				carImages: {
					isMain: true,
				},
			},
			isActive: true,
		},
		order: orderBy
			? { car: orderByOptions[orderBy as CarAdsOrderByOptions] }
			: undefined,
	}
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

export const deleteCarAdOptions = (carAdId: number): FindOneOptions<CarAd> => ({
	relations: {
		car: true,
	},
	where: {
		id: carAdId,
	},
	select: {
		car: {
			id: true,
		},
	},
})

export const getAllUserCarAdsOptions = (
	userId: string,
	onlyActive: boolean,
): FindOneOptions<CarAd> => ({
	where: {
		user: { id: userId },
		car: { carImages: { isMain: true } },
		isActive: onlyActive ? true : undefined,
	},
	relations: {
		user: true,
		car: {
			carImages: {
				image: true,
			},
		},
	},
	select: {
		id: true,
		dateOfCreation: true,
		title: true,
		isActive: true,
		user: {
			name: true,
			surname: true,
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
})

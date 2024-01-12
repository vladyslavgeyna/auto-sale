import { api, authApi } from '@/http/index'
import { ICreateCarAdInput } from '@/types/car-ad/create-car-ad-input.interface'
import { ICreateCarAdOutput } from '@/types/car-ad/create-car-ad-output.interface'
import { IGetCarAdByIdOutput } from '@/types/car-ad/get-car-ad-by-id-output.interface'
import { IGetCarAdsOutput } from '@/types/car-ad/get-car-ads-output.interface'
import { IGetFilteringSortingDataOutput } from '@/types/car-ad/get-filtering-sorting-data-output.interface'
import IGetAllUserCarAdsOutput from '@/types/car-ad/get-user-car-ads-output.interface'
import { IToggleActiveOutput } from '@/types/car-ad/toggle-active-output.interface'
import { IEnum } from '@/types/enum.interface'
import carBrandService from './car-brand.service'
import carService from './car.service'

export interface IGetCarAdsQueryParams {
	page: number
	limit: number
	carBrandId?: number
	carModelId?: number
	region?: number
	yearFrom?: number
	yearTo?: number
	priceFrom?: number
	priceTo?: number
	orderBy?: number
}

class CarAdService {
	private URI_PREFIX = '/car-ads'

	public getFilteringSortingData =
		async (): Promise<IGetFilteringSortingDataOutput> => {
			const carBrandsResponse = await carBrandService.getAll()
			const regions = await carService.getRegions()
			const orderByOptions = await carService.getOrderByOptions()
			const carBrands: IEnum[] = carBrandsResponse.data.map(carBrand => ({
				id: carBrand.id,
				value: carBrand.name,
			}))
			return {
				carBrands,
				regions: regions.data,
				orderByOptions: orderByOptions.data,
			}
		}

	public delete = async (carAdId: number) => {
		return authApi.delete(`${this.URI_PREFIX}/${carAdId}`)
	}

	public getAll = async (paramsUrl: string) => {
		return api.get<IGetCarAdsOutput>(`${this.URI_PREFIX}${paramsUrl}`)
	}

	public toggleActive = async (carAdId: number) => {
		return authApi.post<IToggleActiveOutput>(
			`${this.URI_PREFIX}/toggle-active`,
			{ carAdId },
		)
	}

	public getAllUserCarAds = async (userId: string) => {
		return authApi.get<IGetAllUserCarAdsOutput>(
			`${this.URI_PREFIX}/users/${userId}`,
		)
	}

	public getById = async (carAdId: number) => {
		return authApi.get<IGetCarAdByIdOutput>(`${this.URI_PREFIX}/${carAdId}`)
	}

	public create = async (carAdData: ICreateCarAdInput) => {
		const formData = new FormData()

		if (carAdData.images && carAdData.images.length) {
			for (let i = 0; i < carAdData.images.length; i++) {
				formData.append('images', carAdData.images[i])
			}
		}

		if (carAdData.additionalOptions) {
			formData.append('additionalOptions', carAdData.additionalOptions)
		}

		formData.append('carBrandId', carAdData.carBrandId.toString())
		formData.append('carModelId', carAdData.carModelId.toString())
		formData.append('color', carAdData.color)
		formData.append('mileage', carAdData.mileage.toString())
		formData.append('price', carAdData.price.toString())
		formData.append('mainImageName', carAdData.mainImageName)
		formData.append('numberOfSeats', carAdData.numberOfSeats.toString())
		formData.append('wheelDrive', carAdData.wheelDrive)
		formData.append('engineCapacity', carAdData.engineCapacity.toString())
		formData.append('transmission', carAdData.transmission)
		formData.append('region', carAdData.region)
		formData.append(
			'yearOfProduction',
			carAdData.yearOfProduction.toString(),
		)
		formData.append('fuel', carAdData.fuel)
		formData.append('text', carAdData.text)
		formData.append('title', carAdData.title)

		return authApi.post<ICreateCarAdOutput>(
			`${this.URI_PREFIX}`,
			formData,
			{
				headers: { 'Content-Type': 'multipart/form-data' },
			},
		)
	}
}

export default new CarAdService()

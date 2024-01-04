import { authApi } from '@/http/index'
import { ICreateCarAdInput } from '@/types/car-ad/create-car-ad-input.interface'
import { ICreateCarAdOutput } from '@/types/car-ad/create-car-ad-output.interface'

class CarAdService {
	private URI_PREFIX = '/car-ad'

	create = async (carAdData: ICreateCarAdInput) => {
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

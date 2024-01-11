import { api, authApi } from '@/http/index'
import { ICreateCarModelInput } from '@/types/car-model/create-car-model-input.interface'
import { ICreateCarModelOutput } from '@/types/car-model/create-car-model-output.interface'
import { IEnum } from '@/types/enum.interface'

class CarModelService {
	private URI_PREFIX = '/car-models'

	getAll = async (carBrandId: number) => {
		return api.get<IEnum[]>(`${this.URI_PREFIX}?carBrandId=${carBrandId}`)
	}

	create = async (createCarModelData: ICreateCarModelInput) => {
		return authApi.post<ICreateCarModelOutput>(`${this.URI_PREFIX}`, {
			...createCarModelData,
		})
	}
}

export default new CarModelService()

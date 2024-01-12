import { api } from '@/http/index'
import { IGetAdditionalDataOutput } from '@/types/car/get-additonal-data-output.interface'
import { IEnum } from '@/types/enum.interface'

class CarService {
	private URI_PREFIX = '/cars'

	getAdditionalData = async () => {
		return api.get<IGetAdditionalDataOutput>(
			`${this.URI_PREFIX}/additional-data`,
		)
	}

	getRegions = async () => {
		return api.get<IEnum[]>(`${this.URI_PREFIX}/regions`)
	}

	getOrderByOptions = async () => {
		return api.get<IEnum[]>(`${this.URI_PREFIX}/order-by-options`)
	}
}

export default new CarService()

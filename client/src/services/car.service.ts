import { api } from '@/http/index'
import { IGetAdditionalDataOutput } from '@/types/car/get-additonal-data-output.interface'

class CarService {
	private URI_PREFIX = '/car'

	getAdditionalData = async () => {
		return api.get<IGetAdditionalDataOutput>(
			`${this.URI_PREFIX}/additional-data`,
		)
	}
}

export default new CarService()

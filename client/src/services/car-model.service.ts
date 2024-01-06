import { api } from '@/http/index'
import { IEnum } from '@/types/enum.interface'

class CarModelService {
	private URI_PREFIX = '/car-models'

	getAll = async (carBrandId: number) => {
		return api.get<IEnum[]>(`${this.URI_PREFIX}?carBrandId=${carBrandId}`)
	}
}

export default new CarModelService()

import { api, authApi } from '@/http/index'
import { ICarBrand } from '@/types/car-brand/car-brand.interface'

class CarBrandService {
	private URI_PREFIX = '/car-brands'

	create = async (name: string) => {
		return authApi.post<ICarBrand>(`${this.URI_PREFIX}`, { name })
	}

	getAll = async () => {
		return api.get<ICarBrand[]>(`${this.URI_PREFIX}`)
	}
}

export default new CarBrandService()

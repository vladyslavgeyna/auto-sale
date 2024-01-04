import { Repository } from 'typeorm'
import { appDataSource } from './../../data-source'
import { CarBrand } from './car-brand.entity'

class CarAdService {
	private carBrandRepository: Repository<CarBrand>

	constructor() {
		this.carBrandRepository = appDataSource.getRepository(CarBrand)
	}

	async getAll() {
		const carBrands = await this.carBrandRepository.find()
		return carBrands
	}
}

export default new CarAdService()

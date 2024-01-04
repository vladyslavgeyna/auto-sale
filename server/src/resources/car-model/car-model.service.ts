import { Repository } from 'typeorm'
import { appDataSource } from './../../data-source'
import { CarModel } from './car-model.entity'

class CarModelService {
	private carModelRepository: Repository<CarModel>

	constructor() {
		this.carModelRepository = appDataSource.getRepository(CarModel)
	}

	async getAll(carBrandId?: number) {
		const carModels = await this.carModelRepository.find({
			where: { carBrand: { id: carBrandId } },
		})

		return carModels
	}
}

export default new CarModelService()

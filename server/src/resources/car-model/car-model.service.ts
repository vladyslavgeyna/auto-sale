import { ILike, Repository } from 'typeorm'
import HttpError from '../../utils/exceptions/http.error'
import carBrandService from '../car-brand/car-brand.service'
import { appDataSource } from './../../data-source'
import { CarModel } from './car-model.entity'
import CreateCarModelInputDto from './dtos/create-car-model-input.dto'
import CreateCarModelOutputDto from './dtos/create-car-model-output.dto'

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

	async getById(id: number) {
		const carModel = await this.carModelRepository.findOne({
			where: { id },
			relations: {
				carBrand: true,
			},
		})

		return carModel
	}

	/**
	 * Checks if car model exists for the car brand
	 * @param name car model name to check if exists
	 * @param carBrandId car brand id to check if exists
	 * @returns true if car model exists for the car brand
	 */
	async exists(name: string, carBrandId: number) {
		const exists = await this.carModelRepository.exist({
			where: { name: ILike(name), carBrand: { id: carBrandId } },
		})
		return exists
	}

	async create(
		createCarModelData: CreateCarModelInputDto,
	): Promise<CreateCarModelOutputDto> {
		const carBrandExists = await carBrandService.exists(
			createCarModelData.carBrandId,
		)

		if (!carBrandExists) {
			throw HttpError.BadRequest('Invalid car brand')
		}

		const carModelExists = await this.exists(
			createCarModelData.name,
			createCarModelData.carBrandId,
		)

		if (carModelExists) {
			throw HttpError.BadRequest(
				`Car model with name ${createCarModelData.name} already exists for the chosen car brand`,
			)
		}

		const carModel = this.carModelRepository.create({
			name: createCarModelData.name,
			carBrand: { id: createCarModelData.carBrandId },
		})
		const createdCarModel = await this.carModelRepository.save(carModel)

		return {
			id: createdCarModel.id,
			name: createdCarModel.name,
			carBrandId: createdCarModel.carBrand.id,
		}
	}
}

export default new CarModelService()

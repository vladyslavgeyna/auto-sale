import { ILike, Repository } from 'typeorm'
import HttpError from '../../utils/exceptions/http.error'
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

	/**
	 *
	 * @param name name of the car brand to check if exists
	 * @returns true if car brand exists, otherwise false
	 */
	async existsByName(name: string) {
		const exists = await this.carBrandRepository.exist({
			where: { name: ILike(name) },
		})
		return exists
	}

	/**
	 *
	 * @param id id of the car brand to check if exists
	 * @returns true if car brand exists, otherwise false
	 */
	async exists(id: number) {
		const exists = await this.carBrandRepository.exist({
			where: { id },
		})
		return exists
	}

	async create(name: string) {
		const exists = await this.existsByName(name)

		if (exists) {
			throw HttpError.BadRequest(
				`Car brand with name ${name} already exists`,
			)
		}

		const carBrand = this.carBrandRepository.create({ name })
		const createdCarBrand = await this.carBrandRepository.save(carBrand)
		return createdCarBrand
	}
}

export default new CarAdService()

import { Repository } from 'typeorm'
import { appDataSource } from '../../data-source'
import { Car } from './car.entity'
import CreateCarInputDto from './dtos/create-car-input.dto'

class CarService {
	private carRepository: Repository<Car>

	constructor() {
		this.carRepository = appDataSource.getRepository(Car)
	}

	async create(car: CreateCarInputDto) {
		const newCar = this.carRepository.create(car)

		const createdCar = await this.carRepository.save(newCar)

		return createdCar
	}
}

export default new CarService()

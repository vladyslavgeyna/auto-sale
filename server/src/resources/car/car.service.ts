import { Repository } from 'typeorm'
import { appDataSource } from '../../data-source'
import { getEnumAsEnumDtoArray } from '../../utils/enums/enum.utils'
import carBrandService from '../car-brand/car-brand.service'
import { Car } from './car.entity'
import CreateCarInputDto from './dtos/create-car-input.dto'
import GetAdditionalDataOutputDto from './dtos/get-additional-data-output.dto'
import { Color } from './enums/color.enum'
import { Fuel } from './enums/fuel.enum'
import { Region } from './enums/region.enum'
import { Transmission } from './enums/transmission.enum'
import { WheelDrive } from './enums/wheel-drive.enum'

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

	async getAdditionalData(): Promise<GetAdditionalDataOutputDto> {
		const carBrands = await carBrandService.getAll()
		const regions = getEnumAsEnumDtoArray(Region)
		const wheelDrives = getEnumAsEnumDtoArray(WheelDrive)
		const transmissions = getEnumAsEnumDtoArray(Transmission)
		const fuels = getEnumAsEnumDtoArray(Fuel)
		const colors = getEnumAsEnumDtoArray(Color)

		return {
			regions,
			wheelDrives,
			carBrands: carBrands.map(carBrand => ({
				id: carBrand.id,
				value: carBrand.name,
			})),
			transmissions,
			fuels,
			colors,
		}
	}

	async delete(id: number) {
		await this.carRepository.delete(id)
	}
}

export default new CarService()

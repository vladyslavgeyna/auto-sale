import { Repository } from 'typeorm'
import { getFormattedDate } from '../../utils/date.utils'
import carImageService from '../car-image/car-image.service'
import carService from '../car/car.service'
import CreateCarInputDto from '../car/dtos/create-car-input.dto'
import { appDataSource } from './../../data-source'
import { CarAd } from './car-ad.entity'
import CreateCarAdInputDto from './dtos/create-car-ad-input.dto'
import CreateCarOutputDto from './dtos/create-car-ad-output.dto'

class CarAdService {
	private carAdRepository: Repository<CarAd>

	constructor() {
		this.carAdRepository = appDataSource.getRepository(CarAd)
	}

	async create(
		carAd: CreateCarAdInputDto & { userId: string },
		images: Express.Multer.File[],
	): Promise<CreateCarOutputDto> {
		const createCarInputDto: CreateCarInputDto = {
			carBrand: { id: carAd.carBrandId },
			carModel: { id: carAd.carBrandId },
			color: carAd.color,
			region: carAd.region,
			fuel: carAd.fuel,
			engineCapacity: carAd.engineCapacity,
			mileage: carAd.mileage,
			numberOfSeats: carAd.numberOfSeats,
			wheelDrive: carAd.wheelDrive,
			transmission: carAd.transmission,
			yearOfProduction: carAd.yearOfProduction,
			price: carAd.price,
			additionalOptions: carAd.additionalOptions || null,
		}

		const createdCar = await carService.create(createCarInputDto)

		const newCarAd = this.carAdRepository.create({
			car: createdCar,
			text: carAd.text,
			title: carAd.title,
			user: { id: carAd.userId },
			dateOfCreation: new Date(),
		})

		const createdCarAd = await this.carAdRepository.save(newCarAd)

		await carImageService.saveImages(
			images,
			createdCar,
			carAd.mainImageName,
		)

		return {
			id: createdCarAd.id,
			text: createdCarAd.text,
			title: createdCarAd.title,
			wheelDrive: createdCarAd.car.wheelDrive,
			yearOfProduction: createdCarAd.car.yearOfProduction,
			region: createdCarAd.car.region,
			additionalOptions: createdCarAd.car.additionalOptions,
			carBrandId: createdCarAd.car.carBrand.id,
			carModelId: createdCarAd.car.carModel.id,
			carId: createdCarAd.car.id,
			color: createdCarAd.car.color,
			engineCapacity: createdCarAd.car.engineCapacity,
			fuel: createdCarAd.car.fuel,
			transmission: createdCarAd.car.transmission,
			mileage: createdCarAd.car.mileage,
			numberOfSeats: createdCarAd.car.numberOfSeats,
			price: createdCarAd.car.price,
			dateOfCreation: getFormattedDate(createdCarAd.dateOfCreation),
		}
	}
}

export default new CarAdService()

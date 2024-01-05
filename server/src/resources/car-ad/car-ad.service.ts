import { Repository } from 'typeorm'
import { getFormattedDate } from '../../utils/date.utils'
import HttpError from '../../utils/exceptions/http.error'
import awsService from '../aws/aws.service'
import carImageService from '../car-image/car-image.service'
import carModelService from '../car-model/car-model.service'
import carService from '../car/car.service'
import CreateCarInputDto from '../car/dtos/create-car-input.dto'
import { Fuel } from '../car/enums/fuel.enum'
import { Transmission } from '../car/enums/transmission.enum'
import { WheelDrive } from '../car/enums/wheel-drive.enum'
import { appDataSource } from './../../data-source'
import { CarAd } from './car-ad.entity'
import { getAllCarAdsOptions } from './car-ad.utils'
import { CarAdDto } from './dtos/car-ad.dto'
import CreateCarAdInputDto from './dtos/create-car-ad-input.dto'
import CreateCarOutputDto from './dtos/create-car-ad-output.dto'
import { GetAllCarAdsOutputDto } from './dtos/get-all-car-ads-output.dto'

class CarAdService {
	private carAdRepository: Repository<CarAd>

	constructor() {
		this.carAdRepository = appDataSource.getRepository(CarAd)
	}

	/**
	 *
	 * @param carAd Car ad to create. Also contains userId of user who is creating car ad
	 * @param images An array of images to save. Taken from req.files if using multer
	 * @returns Created car ad
	 */
	async create(
		carAd: CreateCarAdInputDto & { userId: string },
		images: Express.Multer.File[],
	): Promise<CreateCarOutputDto> {
		if (!images.some(image => image.originalname === carAd.mainImageName)) {
			throw HttpError.BadRequest(
				`Invalid main image. Main image with filename ${carAd.mainImageName} was not found in the provided images`,
			)
		}

		const carModel = await carModelService.getById(carAd.carModelId)

		if (!carModel || carModel.carBrand.id !== Number(carAd.carBrandId)) {
			throw HttpError.BadRequest(`Invalid car model`)
		}

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

	async getAll(): Promise<GetAllCarAdsOutputDto> {
		const carAdsFromDatabase = await this.carAdRepository.findAndCount({
			...getAllCarAdsOptions,
		})

		const carAds: CarAdDto[] = await Promise.all(
			carAdsFromDatabase[0].map(async item => {
				const imageLink = await awsService.getImageUrl(
					item.car.carImages[0].image.name,
				)
				return {
					id: item.id,
					title: item.title,
					price: item.car.price,
					image: imageLink,
					engineCapacity: item.car.engineCapacity,
					fuel: Fuel[item.car.fuel],
					transmission: Transmission[item.car.transmission],
					wheelDrive: WheelDrive[item.car.wheelDrive],
					mileage: item.car.mileage,
				}
			}),
		)

		return { carAds, count: carAdsFromDatabase[1] }
	}
}

export default new CarAdService()

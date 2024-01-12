import { Repository } from 'typeorm'
import { getFormattedDate } from '../../utils/date.utils'
import HttpError from '../../utils/exceptions/http.error'
import awsService from '../aws/aws.service'
import carComparisonService from '../car-comparison/car-comparison.service'
import carImageService from '../car-image/car-image.service'
import carModelService from '../car-model/car-model.service'
import carService from '../car/car.service'
import CreateCarInputDto from '../car/dtos/create-car-input.dto'
import { Color } from '../car/enums/color.enum'
import { Fuel } from '../car/enums/fuel.enum'
import { Region } from '../car/enums/region.enum'
import { Transmission } from '../car/enums/transmission.enum'
import { WheelDrive } from '../car/enums/wheel-drive.enum'
import favoriteAdService from '../favorite-ad/favorite-ad.service'
import userService from '../user/user.service'
import { appDataSource } from './../../data-source'
import { CarAd } from './car-ad.entity'
import {
	deleteCarAdOptions,
	getAllCarAdsOptions,
	getAllUserCarAdsOptions,
	getCarAdByIdOptions,
} from './car-ad.utils'
import { CarAdDto } from './dtos/car-ad.dto'
import CreateCarAdInputDto from './dtos/create-car-ad-input.dto'
import CreateCarAdOutputDto from './dtos/create-car-ad-output.dto'
import { GetAllCarAdsInputDto } from './dtos/get-all-car-ads-input.dto'
import { GetAllCarAdsOutputDto } from './dtos/get-all-car-ads-output.dto'
import GetAllUserCarAdsOutputDto, {
	GetAllUserCarAdDto,
} from './dtos/get-all-user-car-ads-output.dto'
import { GetCarAdByIdOutput } from './dtos/get-car-ad-by-id-output.dto'
import ToggleActiveOutputDto from './dtos/toggle-active-output.dto'

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
	): Promise<CreateCarAdOutputDto> {
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

	async getAll(
		queryParamsData: GetAllCarAdsInputDto,
	): Promise<GetAllCarAdsOutputDto> {
		const DEFAULT_LIMIT = 20
		const DEFAULT_PAGE = 1

		const limit = queryParamsData.limit
			? Number(queryParamsData.limit) || DEFAULT_LIMIT
			: DEFAULT_LIMIT

		const page = queryParamsData.page
			? Number(queryParamsData.page) || DEFAULT_PAGE
			: DEFAULT_PAGE

		const offset = page * limit - limit

		const carAdsOptions = getAllCarAdsOptions({
			...queryParamsData,
			limit,
			offset,
		})

		const carAdsFromDatabase = await this.carAdRepository.findAndCount(
			carAdsOptions,
		)

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

	async exists(id: number) {
		const exists = await this.carAdRepository.exist({ where: { id } })

		return exists
	}

	async existsByCarAdIdAndUserId(id: number, userId: string) {
		const exists = await this.carAdRepository.exist({
			where: { id, user: { id: userId } },
		})

		return exists
	}

	/**
	 *
	 * @param userId user id of user who is requesting to toggle active status of car ad. Car ad must belong to this user
	 * @param carAdId id of car ad to toggle active status
	 * @returns result activation status of car ad
	 */
	async toggleActive(
		userId: string,
		carAdId: number,
	): Promise<ToggleActiveOutputDto> {
		const candidate = await this.carAdRepository.findOne({
			where: {
				id: carAdId,
			},
			relations: {
				user: true,
			},
		})

		if (!candidate) {
			throw HttpError.BadRequest('Invalid car ad')
		}

		if (candidate.user.id !== userId) {
			throw HttpError.Forbidden(
				'You are not allowed to perform this action',
			)
		}

		const currentStatus = candidate.isActive

		candidate.isActive = !currentStatus

		await this.carAdRepository.save(candidate)

		return {
			isActivated: !currentStatus,
		}
	}

	async delete(id: number, userId: string) {
		const carAd = await this.carAdRepository.findOne(deleteCarAdOptions(id))

		if (!carAd) {
			throw HttpError.NotFound(`Car ad was not found`)
		}

		const isCurrentUserCarAd = await this.existsByCarAdIdAndUserId(
			id,
			userId,
		)

		if (!isCurrentUserCarAd) {
			throw HttpError.Forbidden(
				`You are not allowed to perform this action`,
			)
		}

		await carComparisonService.deleteByCarAdId(id)

		await favoriteAdService.deleteByCarAdId(id)

		await this.carAdRepository.delete(id)

		await carImageService.deleteByCarId(carAd.car.id)

		await carService.delete(carAd.car.id)
	}

	async getById(id: number, authenticatedUserId?: string) {
		const carAdFromDatabase = await this.carAdRepository.findOne(
			getCarAdByIdOptions(id),
		)

		if (!carAdFromDatabase) {
			throw HttpError.NotFound(`Car ad was not found`)
		}

		if (
			(authenticatedUserId &&
				authenticatedUserId != carAdFromDatabase.user.id &&
				!carAdFromDatabase.isActive) ||
			(!authenticatedUserId && !carAdFromDatabase.isActive)
		) {
			throw HttpError.Forbidden(
				`The ad you are looking for is not active at the moment`,
			)
		}

		const images: string[] = []
		let userImage: string | null = null

		for (const carImage of carAdFromDatabase.car.carImages) {
			const imageLink = await awsService.getImageUrl(carImage.image.name)
			images.push(imageLink)
		}

		if (carAdFromDatabase.user.image?.name) {
			userImage = await awsService.getImageUrl(
				carAdFromDatabase.user.image.name,
			)
		}

		const carAd: GetCarAdByIdOutput = {
			id: carAdFromDatabase.id,
			additionalOptions: carAdFromDatabase.car.additionalOptions,
			carBrand: carAdFromDatabase.car.carBrand.name,
			carModel: carAdFromDatabase.car.carModel.name,
			engineCapacity: carAdFromDatabase.car.engineCapacity,
			fuel: Fuel[carAdFromDatabase.car.fuel],
			transmission: Transmission[carAdFromDatabase.car.transmission],
			wheelDrive: WheelDrive[carAdFromDatabase.car.wheelDrive],
			color: Color[carAdFromDatabase.car.color],
			region: Region[carAdFromDatabase.car.region],
			mileage: carAdFromDatabase.car.mileage,
			title: carAdFromDatabase.title,
			text: carAdFromDatabase.text,
			price: carAdFromDatabase.car.price,
			images,
			yearOfProduction: carAdFromDatabase.car.yearOfProduction,
			numberOfSeats: carAdFromDatabase.car.numberOfSeats,
			dateOfCreation: getFormattedDate(carAdFromDatabase.dateOfCreation),
			userId: carAdFromDatabase.user.id,
			isActive: carAdFromDatabase.isActive,
			userName: carAdFromDatabase.user.name,
			userSurname: carAdFromDatabase.user.surname,
			userPhone: carAdFromDatabase.user.phone,
			userEmail: carAdFromDatabase.user.email,
			userImage,
		}

		return carAd
	}

	/**
	 * Gets all car ads of a user. If currentUserId is provided, and userId equals currentUserId then all user's car ads will be returned. Otherwise, only active car ads will be returned
	 * @param userId user id of user whose car ads to get
	 * @param currentUserId user id of user who is requesting car ads. If currentUserId is not provided, then only active car ads will be returned
	 * @returns User's car ads
	 */
	async getAllUserCarAds(
		userId: string,
		currentUserId?: string,
	): Promise<GetAllUserCarAdsOutputDto> {
		const exists = await userService.exists(userId)

		if (!exists) {
			throw HttpError.NotFound(`User was not found`)
		}

		const carAdsData = await this.carAdRepository.findAndCount(
			getAllUserCarAdsOptions(
				userId,
				currentUserId ? userId !== currentUserId : true,
			),
		)

		const carAds: GetAllUserCarAdDto[] = await Promise.all(
			carAdsData[0].map(async item => {
				const imageLink = await awsService.getImageUrl(
					item.car.carImages[0].image.name,
				)
				return {
					id: item.id,
					dateOfCreation: getFormattedDate(item.dateOfCreation),
					region: Region[item.car.region],
					userName: item.user.name,
					userSurname: item.user.surname,
					title: item.title,
					price: item.car.price,
					mileage: item.car.mileage,
					fuel: Fuel[item.car.fuel],
					engineCapacity: item.car.engineCapacity,
					wheelDrive: WheelDrive[item.car.wheelDrive],
					transmission: Transmission[item.car.transmission],
					image: imageLink,
					isActive: item.isActive,
				}
			}),
		)

		return { carAds, count: carAdsData[1] }
	}
}

export default new CarAdService()

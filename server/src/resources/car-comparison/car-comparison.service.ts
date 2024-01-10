import { Repository } from 'typeorm'
import { appDataSource } from '../../data-source'
import HttpError from '../../utils/exceptions/http.error'
import awsService from '../aws/aws.service'
import carAdService from '../car-ad/car-ad.service'
import { Color } from '../car/enums/color.enum'
import { Fuel } from '../car/enums/fuel.enum'
import { Region } from '../car/enums/region.enum'
import { Transmission } from '../car/enums/transmission.enum'
import { WheelDrive } from '../car/enums/wheel-drive.enum'
import { CarComparison } from './car-comparison.entity'
import { getAllCarComparisonsOptions } from './car-comparison.utils'
import GetAllCarComparisonsOutputDto from './dtos/get-all-car-comparisons-output.dto'
import ToggleCarComparisonOutputDto from './dtos/toggle-car-comparison-output.dto'

class CarComparisonService {
	private carComparisonRepository: Repository<CarComparison>

	constructor() {
		this.carComparisonRepository =
			appDataSource.getRepository(CarComparison)
	}

	async getByUserIdAndCarAdId(userId: string, carAdId: number) {
		const carComparison = await this.carComparisonRepository.findOneBy({
			user: { id: userId },
			carAd: { id: carAdId },
		})

		return carComparison
	}

	async deleteByCarAdId(carAdId: number) {
		await this.carComparisonRepository.delete({ carAd: { id: carAdId } })
	}

	async toggle(
		userId: string,
		carAdId: number,
	): Promise<ToggleCarComparisonOutputDto> {
		const exists = await carAdService.exists(carAdId)

		if (!exists) {
			throw HttpError.NotFound('Car ad was not found')
		}

		const isTheSameUserAd = await carAdService.existsByCarAdIdAndUserId(
			carAdId,
			userId,
		)

		if (isTheSameUserAd) {
			throw HttpError.BadRequest(
				'You are not allowed to compare your own car ad',
			)
		}

		const candidate = await this.carComparisonRepository.findOneBy({
			user: { id: userId },
			carAd: { id: carAdId },
		})

		if (candidate) {
			await this.carComparisonRepository.remove(candidate)
			return { added: false }
		} else {
			const newCarComparison = this.carComparisonRepository.create({
				carAd: { id: carAdId },
				user: { id: userId },
			})
			await this.carComparisonRepository.save(newCarComparison)
			return { added: true }
		}
	}

	async getAll(userId: string): Promise<GetAllCarComparisonsOutputDto> {
		const carComparisonsFromDatabase =
			await this.carComparisonRepository.find(
				getAllCarComparisonsOptions(userId),
			)

		const carComparisons: GetAllCarComparisonsOutputDto = await Promise.all(
			carComparisonsFromDatabase.map(async item => {
				const imageLink = await awsService.getImageUrl(
					item.carAd.car.carImages[0].image.name,
				)
				return {
					yearOfProduction: item.carAd.car.yearOfProduction,
					carAdId: item.carAd.id,
					carBrandName: item.carAd.car.carBrand.name,
					carModelName: item.carAd.car.carModel.name,
					additionalOptions: item.carAd.car.additionalOptions,
					numberOfSeats: item.carAd.car.numberOfSeats,
					color: Color[item.carAd.car.color],
					region: Region[item.carAd.car.region],
					title: item.carAd.title,
					price: item.carAd.car.price,
					mileage: item.carAd.car.mileage,
					fuel: Fuel[item.carAd.car.fuel],
					engineCapacity: item.carAd.car.engineCapacity,
					wheelDrive: WheelDrive[item.carAd.car.wheelDrive],
					transmission: Transmission[item.carAd.car.transmission],
					image: imageLink,
				}
			}),
		)

		return carComparisons
	}
}

export default new CarComparisonService()

import { Repository } from 'typeorm'
import { appDataSource } from '../../data-source'
import awsService from '../aws/aws.service'
import { Fuel } from '../car/enums/fuel.enum'
import { Region } from '../car/enums/region.enum'
import { Transmission } from '../car/enums/transmission.enum'
import { WheelDrive } from '../car/enums/wheel-drive.enum'
import FavoriteAdDto from './dtos/favorite-ad.dto'
import GetAllFavoriteAdsOutputDto from './dtos/get-all-favorite-ads-output.dto'
import ToggleFavoriteAdOutputDto from './dtos/toggle-favorite-ad-output.dto'
import { FavoriteAd } from './favorite-ad.entity'
import { getAllFavoriteAdsOptions } from './favorite-ad.utils'

class FavoriteAdService {
	private favoriteAdRepository: Repository<FavoriteAd>

	constructor() {
		this.favoriteAdRepository = appDataSource.getRepository(FavoriteAd)
	}

	async getCountByCarAdId(carAdId: number) {
		const count = await this.favoriteAdRepository.countBy({
			carAd: { id: carAdId },
		})
		return count
	}

	async getByUserIdAndCarAdId(userId: string, carAdId: number) {
		const favoriteAd = await this.favoriteAdRepository.findOneBy({
			user: { id: userId },
			carAd: { id: carAdId },
		})
		return favoriteAd
	}

	async toggle(
		userId: string,
		carAdId: number,
	): Promise<ToggleFavoriteAdOutputDto> {
		const candidate = await this.favoriteAdRepository.findOneBy({
			user: { id: userId },
			carAd: { id: carAdId },
		})
		if (candidate) {
			await this.favoriteAdRepository.remove(candidate)
			return { added: false }
		} else {
			const newFavoriteAd = this.favoriteAdRepository.create({
				carAd: { id: carAdId },
				user: { id: userId },
			})
			await this.favoriteAdRepository.save(newFavoriteAd)
			return { added: true }
		}
	}

	async getAll(userId: string): Promise<GetAllFavoriteAdsOutputDto> {
		const favoriteAdsData = await this.favoriteAdRepository.findAndCount(
			getAllFavoriteAdsOptions(userId),
		)

		const favoriteAds: FavoriteAdDto[] = await Promise.all(
			favoriteAdsData[0].map(async item => {
				const imageLink = await awsService.getImageUrl(
					item.carAd.car.carImages[0].image.name,
				)
				return {
					region: Region[item.carAd.car.region],
					phone: item.carAd.user.phone,
					email: item.carAd.user.email,
					name: item.carAd.user.name,
					surname: item.carAd.user.surname,
					carAdId: item.carAd.id,
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

		return { favoriteAds, count: favoriteAdsData[1] }
	}
}

export default new FavoriteAdService()

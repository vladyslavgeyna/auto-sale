import { Repository } from 'typeorm'
import { appDataSource } from '../../data-source'
import ToggleFavoriteAdOutputDto from './dtos/toggle-favorite-ad-output.dto'
import { FavoriteAd } from './favorite-ad.entity'

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
}

export default new FavoriteAdService()

import { Repository } from 'typeorm'
import { appDataSource } from '../../data-source'
import { CarComparison } from './car-comparison.entity'
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

	async toggle(
		userId: string,
		carAdId: number,
	): Promise<ToggleCarComparisonOutputDto> {
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
}

export default new CarComparisonService()

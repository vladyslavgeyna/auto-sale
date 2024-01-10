import { authApi } from '@/http/index'
import { IGetCarComparisonsOutput } from '@/types/car-comparison/get-car-comparisons-output.interface'
import { IToggleCarComparisonOutput } from '@/types/car-comparison/toggle-car-comparison-output.interface'

class CarComparisonService {
	private URI_PREFIX = '/car-comparisons'

	getAll = async () => {
		return authApi.get<IGetCarComparisonsOutput>(`${this.URI_PREFIX}`)
	}

	exists = async (carAdId: number) => {
		return authApi.get<boolean>(
			`${this.URI_PREFIX}/exists/car-ads/${carAdId}`,
		)
	}

	toggle = async (carAdId: number) => {
		return authApi.post<IToggleCarComparisonOutput>(
			`${this.URI_PREFIX}/toggle`,
			{ carAdId },
		)
	}
}

export default new CarComparisonService()

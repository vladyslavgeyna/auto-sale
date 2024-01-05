import { NextFunction, Response } from 'express'
import redisClient from '../../redis'
import { EnumDto } from '../../utils/enums/enum.dto'
import { RequestWithQuery } from '../../utils/types/request.type'
import carModelService from './car-model.service'

class CarModelController {
	async getAll(
		req: RequestWithQuery<{ carBrandId?: string }>,
		res: Response,
		next: NextFunction,
	) {
		try {
			const carBrandIdParam = req.query.carBrandId
				? Number(req.query.carBrandId)
				: undefined

			const carBrandId = carBrandIdParam || undefined
			const carModels = await carModelService.getAll(carBrandId)

			const carModelsResponse: EnumDto[] = carModels.map(carModel => ({
				id: carModel.id,
				value: carModel.name,
			}))

			if (carModelsResponse.length > 0) {
				const key = redisClient.constructKey(
					'car-model',
					undefined,
					'car-brand',
					carBrandId,
				)

				await redisClient.set(key, carModelsResponse)
			}

			res.json(carModelsResponse)
		} catch (error) {
			next(error)
		}
	}
}

export default new CarModelController()

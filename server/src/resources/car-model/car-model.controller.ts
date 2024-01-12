import { NextFunction, Response } from 'express'
import redisClient from '../../redis'
import { EnumDto } from '../../utils/enums/enum.dto'
import {
	RequestWithBody,
	RequestWithQuery,
} from '../../utils/types/request.type'
import carModelService from './car-model.service'
import CreateCarModelInputDto from './dtos/create-car-model-input.dto'

class CarModelController {
	async getAll(
		req: RequestWithQuery<{ carBrandId?: string }>,
		res: Response,
		next: NextFunction,
	) {
		try {
			const carBrandId = req.query.carBrandId
				? Number(req.query.carBrandId) || undefined
				: undefined

			const carModels = await carModelService.getAll(carBrandId)

			const carModelsResponse: EnumDto[] = carModels.map(carModel => ({
				id: carModel.id,
				value: carModel.name,
			}))

			if (carModelsResponse.length > 0) {
				const key = redisClient.constructKey(
					'car-models',
					undefined,
					'car-brands',
					carBrandId,
				)

				await redisClient.set(key, carModelsResponse)
			}

			res.json(carModelsResponse)
		} catch (error) {
			next(error)
		}
	}

	async create(
		req: RequestWithBody<CreateCarModelInputDto>,
		res: Response,
		next: NextFunction,
	) {
		try {
			const carModel = await carModelService.create(req.body)

			res.json(carModel)
		} catch (error) {
			next(error)
		}
	}
}

export default new CarModelController()

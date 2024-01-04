import { NextFunction, Response } from 'express'
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
			const carBrandId = req.query.carBrandId
				? Number(req.query.carBrandId)
				: undefined
			const carModels = await carModelService.getAll(carBrandId)

			const carModelsResponse: EnumDto[] = carModels.map(carModel => ({
				id: carModel.id,
				value: carModel.name,
			}))

			res.json(carModelsResponse)
		} catch (error) {
			next(error)
		}
	}
}

export default new CarModelController()

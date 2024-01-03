import { NextFunction, Response } from 'express'
import HttpError from '../../utils/exceptions/http.error'
import { RequestWithBody } from '../../utils/types/request.type'
import carAdService from './car-ad.service'
import CreateCarAdInputDto from './dtos/create-car-ad-input.dto'

class CarAdController {
	async create(
		req: RequestWithBody<CreateCarAdInputDto>,
		res: Response,
		next: NextFunction,
	) {
		try {
			if (!req.authUser) {
				return next(HttpError.UnauthorizedError())
			}

			const images = req.files

			if (!images || !images.length || !(images instanceof Array)) {
				return next(HttpError.BadRequest(`Car images are required`))
			}

			const createdCarAd = await carAdService.create(
				{
					...req.body,
					userId: req.authUser.id,
				},
				images,
			)

			return res.json(createdCarAd)
		} catch (error) {
			next(error)
		}
	}
}

export default new CarAdController()

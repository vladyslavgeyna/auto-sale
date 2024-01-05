import { NextFunction, Request, Response } from 'express'
import redisClient from '../../redis'
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

	async getAll(req: Request, res: Response, next: NextFunction) {
		try {
			const data = await carAdService.getAll()

			if (data.count > 0) {
				const key = redisClient.constructKey('car-ad')

				await redisClient.set(key, data)
			}

			return res.json(data)
		} catch (error) {
			next(error)
		}
	}
}

export default new CarAdController()

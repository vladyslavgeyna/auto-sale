import { NextFunction, Request, Response } from 'express'
import redisClient from '../../redis'
import HttpError from '../../utils/exceptions/http.error'
import {
	RequestWithBody,
	RequestWithParams,
} from '../../utils/types/request.type'
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
			const carAds = await carAdService.getAll()

			if (carAds.count > 0) {
				const key = redisClient.constructKey('car-ad')

				await redisClient.set(key, carAds)
			}

			return res.json(carAds)
		} catch (error) {
			next(error)
		}
	}

	async getById(
		req: RequestWithParams<{ id: string }>,
		res: Response,
		next: NextFunction,
	) {
		try {
			const carAdId = req.params.id
				? Number(req.params.id) || undefined
				: undefined

			if (!carAdId) {
				return next(HttpError.BadRequest(`Invalid car ad id`))
			}

			const authenticatedUserId = req.authUser?.id

			const carAd = await carAdService.getById(
				carAdId,
				authenticatedUserId,
			)

			if (carAd.isActive) {
				const key = redisClient.constructKey(
					'car-ad',
					Number(req.params.id),
				)

				await redisClient.set(key, carAd)
			}

			return res.json(carAd)
		} catch (error) {
			next(error)
		}
	}

	async getAllUserCarAds(
		req: RequestWithParams<{ userId: string }>,
		res: Response,
		next: NextFunction,
	) {
		try {
			const currentUserId = req.authUser?.id

			const ads = await carAdService.getAllUserCarAds(
				req.params.userId,
				currentUserId,
			)

			return res.json(ads)
		} catch (error) {
			next(error)
		}
	}
}

export default new CarAdController()

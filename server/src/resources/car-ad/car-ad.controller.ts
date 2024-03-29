import { NextFunction, Response } from 'express'
import redisClient from '../../redis'
import HttpStatusCode from '../../utils/enums/http-status-code'
import HttpError from '../../utils/exceptions/http.error'
import {
	RequestWithBody,
	RequestWithParams,
	RequestWithQuery,
} from '../../utils/types/request.type'
import carAdService from './car-ad.service'
import CreateCarAdInputDto from './dtos/create-car-ad-input.dto'
import { GetAllCarAdsInputDto } from './dtos/get-all-car-ads-input.dto'
import ToggleActiveInputDto from './dtos/toggle-active-input.dto'
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

	async getAll(
		req: RequestWithQuery<GetAllCarAdsInputDto>,
		res: Response,
		next: NextFunction,
	) {
		try {
			const carAds = await carAdService.getAll(req.query)

			if (carAds.count > 0) {
				const key = redisClient.constructKeyFromQuery(
					'car-ads',
					req.query,
				)

				await redisClient.set(key, carAds, 30)
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
				return next(HttpError.BadRequest(`Invalid car ad`))
			}

			const authenticatedUserId = req.authUser?.id

			const carAd = await carAdService.getById(
				carAdId,
				authenticatedUserId,
			)

			if (carAd.isActive) {
				const key = redisClient.constructKey('car-ads', carAdId)

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

	async toggleActive(
		req: RequestWithBody<ToggleActiveInputDto>,
		res: Response,
		next: NextFunction,
	) {
		try {
			if (!req.authUser) {
				throw HttpError.UnauthorizedError()
			}

			const response = await carAdService.toggleActive(
				req.authUser.id,
				req.body.carAdId,
			)

			if (!response.isActivated) {
				const key = redisClient.constructKey(
					'car-ads',
					req.body.carAdId,
				)

				await redisClient.delete(key)
			}

			res.json(response)
		} catch (error) {
			next(error)
		}
	}

	async delete(
		req: RequestWithParams<{ id: string }>,
		res: Response,
		next: NextFunction,
	) {
		try {
			if (!req.authUser) {
				return next(HttpError.UnauthorizedError())
			}

			const carAdId = req.params.id
				? Number(req.params.id) || undefined
				: undefined

			if (!carAdId) {
				return next(HttpError.BadRequest(`Invalid car ad`))
			}

			await carAdService.delete(carAdId, req.authUser.id)

			const key = redisClient.constructKey('car-ads', carAdId)

			await redisClient.delete(key)

			res.sendStatus(HttpStatusCode.NO_CONTENT_204)
		} catch (error) {
			next(error)
		}
	}
}

export default new CarAdController()

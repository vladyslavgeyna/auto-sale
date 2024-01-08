import { NextFunction, Response } from 'express'
import HttpError from '../../utils/exceptions/http.error'
import {
	RequestWithBody,
	RequestWithParams,
} from '../../utils/types/request.type'
import ToggleFavoriteAdInputDto from './dtos/toggle-favorite-ad-input.dto'
import favoriteAdService from './favorite-ad.service'

class FavoriteAdController {
	async getCountByCarAdId(
		req: RequestWithParams<{ carAdId: string }>,
		res: Response,
		next: NextFunction,
	) {
		try {
			const carAdId = req.params.carAdId
				? Number(req.params.carAdId) || undefined
				: undefined

			if (!carAdId) {
				throw HttpError.BadRequest('Invalid car ad id')
			}

			const count = await favoriteAdService.getCountByCarAdId(carAdId)

			res.json({ count })
		} catch (error) {
			next(error)
		}
	}

	async exists(
		req: RequestWithParams<{ carAdId: string }>,
		res: Response,
		next: NextFunction,
	) {
		try {
			if (!req.authUser) {
				throw HttpError.UnauthorizedError()
			}

			const carAdId = req.params.carAdId
				? Number(req.params.carAdId) || undefined
				: undefined

			if (!carAdId) {
				throw HttpError.BadRequest('Invalid car ad id')
			}

			const favoriteAd = await favoriteAdService.getByUserIdAndCarAdId(
				req.authUser.id,
				carAdId,
			)

			res.json(favoriteAd ? true : false)
		} catch (error) {
			next(error)
		}
	}

	async toggle(
		req: RequestWithBody<ToggleFavoriteAdInputDto>,
		res: Response,
		next: NextFunction,
	) {
		try {
			if (!req.authUser) {
				throw HttpError.UnauthorizedError()
			}

			const response = await favoriteAdService.toggle(
				req.authUser.id,
				req.body.carAdId,
			)
			res.json(response)
		} catch (error) {
			next(error)
		}
	}
}

export default new FavoriteAdController()

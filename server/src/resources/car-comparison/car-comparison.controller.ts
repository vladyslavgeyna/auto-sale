import { NextFunction, Response } from 'express'
import HttpError from '../../utils/exceptions/http.error'
import {
	RequestWithBody,
	RequestWithParams,
} from '../../utils/types/request.type'
import carComparisonService from './car-comparison.service'
import ToggleCarComparisonInputDto from './dtos/toggle-car-comparison-input.dto'

class CarComparisonController {
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

			const carComparison =
				await carComparisonService.getByUserIdAndCarAdId(
					req.authUser.id,
					carAdId,
				)

			res.json(carComparison ? true : false)
		} catch (error) {
			next(error)
		}
	}

	async toggle(
		req: RequestWithBody<ToggleCarComparisonInputDto>,
		res: Response,
		next: NextFunction,
	) {
		try {
			if (!req.authUser) {
				throw HttpError.UnauthorizedError()
			}

			const response = await carComparisonService.toggle(
				req.authUser.id,
				req.body.carAdId,
			)

			res.json(response)
		} catch (error) {
			next(error)
		}
	}
}

export default new CarComparisonController()

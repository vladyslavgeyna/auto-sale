import { NextFunction, Request, Response } from 'express'
import HttpError from '../../../utils/exceptions/http.error'

export const imagesCountValidation =
	(maxCount: number) =>
	(req: Request, _res: Response, next: NextFunction) => {
		const images = req.files

		if (!images || images.length === 0 || !(images instanceof Array)) {
			return next(HttpError.BadRequest('Images are required'))
		}

		if (images.length > maxCount) {
			return next(
				HttpError.BadRequest(
					`Maximum images count is ${maxCount}, but received count is ${images.length}`,
				),
			)
		}

		next()
	}

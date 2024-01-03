import { NextFunction, Request, Response } from 'express'
import HttpError from '../../../utils/exceptions/http.error'

export const imagesSizeValidation =
	(maxSizeInMB: number) =>
	(req: Request, _res: Response, next: NextFunction) => {
		const images = req.files

		if (!images || images.length === 0 || !(images instanceof Array)) {
			return next(HttpError.BadRequest('Images are required '))
		}

		for (const image of images) {
			if (image.size > maxSizeInMB * 1024 * 1024) {
				throw HttpError.BadRequest(
					`Max image size is ${maxSizeInMB} MB, but one of received images has ${(
						image.size /
						(1024 * 1024)
					).toFixed(2)} MB`,
				)
			}
		}

		next()
	}

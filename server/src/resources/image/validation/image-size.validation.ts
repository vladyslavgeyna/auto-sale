import { NextFunction, Request, Response } from 'express'
import HttpError from '../../../utils/exceptions/http.error'

export const imageSizeValidation =
	(maxSizeInMB: number, isImageRequired: boolean = true) =>
	(req: Request, _res: Response, next: NextFunction) => {
		const image = req.file

		if (!image) {
			if (isImageRequired) {
				return next(HttpError.BadRequest('Image is required'))
			}
			return next()
		}

		if (image.size > maxSizeInMB * 1024 * 1024) {
			throw HttpError.BadRequest(
				`Max image size is ${maxSizeInMB} MB, but received image has ${(
					image.size /
					(1024 * 1024)
				).toFixed(2)} MB`,
			)
		}

		next()
	}

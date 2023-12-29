import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import HttpError from '../utils/exceptions/http.error'

/**
 * Can be used as a middleware for checking validation errors from express-validator
 * @param req Request
 * @param _res Response
 * @param next NextFunction
 * @returns
 */
const checkValidationMiddleware = (
	req: Request,
	_res: Response,
	next: NextFunction,
) => {
	const errors = validationResult(req)

	if (!errors.isEmpty()) {
		return next(
			HttpError.BadRequest(
				'Validation error',
				errors.array().map(error => error.msg),
			),
		)
	}

	next()
}

export default checkValidationMiddleware

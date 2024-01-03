import { NextFunction, Request, Response } from 'express'
import tokenService from '../resources/token/token.service'
import HttpError from '../utils/exceptions/http.error'

const requireAuthMiddleware = (
	req: Request,
	_res: Response,
	next: NextFunction,
) => {
	try {
		const authHeader = req.headers.authorization

		if (!authHeader) {
			return next(HttpError.UnauthorizedError())
		}

		const accessToken = authHeader.split(' ')[1]
		if (!accessToken) {
			return next(HttpError.UnauthorizedError())
		}

		const userData = tokenService.validateAccessToken(accessToken)
		if (!userData) {
			return next(HttpError.UnauthorizedError())
		}

		req.authUser = userData

		next()
	} catch (error) {
		return next(HttpError.UnauthorizedError())
	}
}

export default requireAuthMiddleware

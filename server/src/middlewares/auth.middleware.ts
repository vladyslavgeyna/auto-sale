import { NextFunction, Request, Response } from 'express'
import tokenService from '../resources/token/token.service'

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
	try {
		const authHeader = req.headers.authorization
		if (!authHeader) {
			return next()
		}

		const accessToken = authHeader.split(' ')[1]
		if (!accessToken) {
			return next()
		}

		const userData = tokenService.validateAccessToken(accessToken)
		if (!userData) {
			return next()
		}

		req.authUser = userData

		next()
	} catch (error) {
		return next()
	}
}

export default authMiddleware

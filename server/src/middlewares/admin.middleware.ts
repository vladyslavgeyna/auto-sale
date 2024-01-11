import { NextFunction, Request, Response } from 'express'
import UserRole from '../resources/user/user-role.enum'
import HttpError from '../utils/exceptions/http.error'

const adminMiddleware = (req: Request, _res: Response, next: NextFunction) => {
	try {
		const user = req.authUser

		if (!user) {
			return next(HttpError.UnauthorizedError())
		}

		if (user.role !== UserRole.ADMIN) {
			return next(
				HttpError.Forbidden(
					'You do not have sufficient privileges to perform this action',
				),
			)
		}

		next()
	} catch (error) {
		return next(error)
	}
}

export default adminMiddleware

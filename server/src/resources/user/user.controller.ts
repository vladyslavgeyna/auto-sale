import { NextFunction, Response } from 'express'
import HttpError from '../../utils/exceptions/http.error'
import { RequestWithParams } from '../../utils/types/request.type'
import awsService from '../aws/aws.service'
import userService from './user.service'

class UserController {
	async getById(
		req: RequestWithParams<{ id: string }>,
		res: Response,
		next: NextFunction,
	) {
		try {
			const user = await userService.getById(req.params.id)

			if (!user) {
				return next(HttpError.NotFound('User was not found'))
			}

			let imageLink: string | null = null

			if (user.image) {
				imageLink = await awsService.getImageUrl(user.image.name)
			}

			res.json({
				id: user.id,
				name: user.name,
				email: user.email,
				surname: user.surname,
				phone: user.phone,
				imageLink,
				role: user.role,
			})
		} catch (error) {
			next(error)
		}
	}
}

export default new UserController()

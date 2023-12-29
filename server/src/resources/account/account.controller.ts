import { NextFunction, Response } from 'express'
import { RequestWithBody } from '../../utils/types/request.type'
import accountService from './account.service'
import RegisterInputDto from './dtos/register-input.dto'

class AccountController {
	async register(
		req: RequestWithBody<RegisterInputDto>,
		res: Response,
		next: NextFunction,
	) {
		try {
			const userData = await accountService.register(req.body, req.file)

			res.json({ ...userData })
		} catch (error) {
			next(error)
		}
	}
}

export default new AccountController()

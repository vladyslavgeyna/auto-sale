import { NextFunction, Response } from 'express'
import {
	RequestWithBody,
	RequestWithParams,
} from '../../utils/types/request.type'
import accountService from './account.service'
import RegisterInputDto from './dtos/register-input.dto'
import VerifyInputDto from './dtos/verify-input.dto'

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

	async verify(
		req: RequestWithParams<VerifyInputDto>,
		res: Response,
		next: NextFunction,
	) {
		try {
			const userId = req.params.userId

			await accountService.verify(userId)

			const clientUrl = String(process.env.CLIENT_URL)

			const redirectUrl = `${clientUrl}/account/login?verified=true`

			res.redirect(redirectUrl)
		} catch (error) {
			next(error)
		}
	}
}

export default new AccountController()

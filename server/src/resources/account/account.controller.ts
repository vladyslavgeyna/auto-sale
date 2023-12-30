import { NextFunction, Response } from 'express'
import {
	RequestWithBody,
	RequestWithParams,
} from '../../utils/types/request.type'
import tokenService from '../token/token.service'
import accountService from './account.service'
import LoginInputDto from './dtos/login-input.dto'
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

	async login(
		req: RequestWithBody<LoginInputDto>,
		res: Response,
		next: NextFunction,
	) {
		try {
			const loginData = await accountService.login(req.body)

			tokenService.saveRefreshTokenCookie(res, loginData.tokens.refreshToken)

			res.json({
				...loginData.user,
				accessToken: loginData.tokens.accessToken,
			})
		} catch (error) {
			next(error)
		}
	}

	async verify(
		req: RequestWithParams<VerifyInputDto>,
		res: Response,
		_next: NextFunction,
	) {
		const clientUrl = String(process.env.CLIENT_URL)

		const redirectUrl = `${clientUrl}/account/login?verified=`

		try {
			const userId = req.params.userId

			await accountService.verify(userId)

			res.redirect(redirectUrl + 'true')
		} catch (error) {
			res.redirect(redirectUrl + 'false')
		}
	}
}

export default new AccountController()

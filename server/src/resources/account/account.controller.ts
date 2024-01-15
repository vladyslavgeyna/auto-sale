import { NextFunction, Request, Response } from 'express'
import redisClient from '../../redis'
import HttpStatusCode from '../../utils/enums/http-status-code'
import HttpError from '../../utils/exceptions/http.error'
import {
	RequestWithBody,
	RequestWithParams,
} from '../../utils/types/request.type'
import tokenService from '../token/token.service'
import accountService from './account.service'
import ChangePasswordInputDto from './dtos/change-password-input.dto'
import EditInputDto from './dtos/edit-input.dto'
import LoginInputDto from './dtos/login-input.dto'
import RegisterInputDto from './dtos/register-input.dto'
import ResetPasswordInputDto from './dtos/reset-password-input.dto'
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

	async changePassword(
		req: RequestWithBody<ChangePasswordInputDto>,
		res: Response,
		next: NextFunction,
	) {
		try {
			if (!req.authUser) {
				return next(HttpError.UnauthorizedError())
			}

			await accountService.changePassword({
				...req.body,
				userId: req.authUser.id,
			})

			res.sendStatus(HttpStatusCode.NO_CONTENT_204)
		} catch (error) {
			next(error)
		}
	}

	async resetPassword(
		req: RequestWithBody<ResetPasswordInputDto>,
		res: Response,
		next: NextFunction,
	) {
		try {
			const { password, resetPasswordUniqueId } = req.body

			const key = redisClient.constructKey(
				`reset-password`,
				resetPasswordUniqueId,
			)

			const userEmail = await redisClient.getString(key)

			if (!userEmail) {
				return next(
					HttpError.BadRequest(
						'Reset password link is probably expired. Try to get a new email with the link again',
					),
				)
			}

			await accountService.resetPassword(userEmail, password)

			await redisClient.delete(key)

			res.sendStatus(HttpStatusCode.NO_CONTENT_204)
		} catch (error) {
			next(error)
		}
	}

	async sendResetPasswordEmail(
		req: RequestWithBody<{ email: string }>,
		res: Response,
		next: NextFunction,
	) {
		try {
			const userEmail = req.body.email

			const uniqueId = await accountService.sendResetPasswordEmail(
				userEmail,
			)

			const key = redisClient.constructKey(`reset-password`, uniqueId)

			await redisClient.setString(key, userEmail, 60 * 15)

			res.sendStatus(HttpStatusCode.NO_CONTENT_204)
		} catch (error) {
			next(error)
		}
	}

	async edit(
		req: RequestWithBody<EditInputDto>,
		res: Response,
		next: NextFunction,
	) {
		try {
			if (!req.authUser) {
				return next(HttpError.UnauthorizedError())
			}

			const userData = await accountService.edit(
				req.body,
				req.authUser.id,
				req.file,
			)

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

			tokenService.saveRefreshTokenCookie(
				res,
				loginData.tokens.refreshToken,
			)

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

	async logout(req: Request, res: Response, next: NextFunction) {
		try {
			const { refreshToken } = req.cookies

			await accountService.logout(refreshToken)

			tokenService.removeRefreshTokenCookie(res)

			req.logout(error => {
				if (error) {
					return next(error)
				}
			})

			res.sendStatus(HttpStatusCode.NO_CONTENT_204)
		} catch (error) {
			next(error)
		}
	}

	async refresh(req: Request, res: Response, next: NextFunction) {
		try {
			const { refreshToken } = req.cookies

			const userData = await accountService.refresh(refreshToken)

			tokenService.saveRefreshTokenCookie(
				res,
				userData.tokens.refreshToken,
			)

			res.json({
				...userData.user,
				accessToken: userData.tokens.accessToken,
			})
		} catch (error) {
			next(error)
		}
	}

	async googleLogin(req: Request, res: Response, _next: NextFunction) {
		try {
			const loginData = await accountService.googleLogin(req.user)

			tokenService.saveRefreshTokenCookie(
				res,
				loginData.tokens.refreshToken,
			)

			// Encode image link to be able to send it as a query parameter because it may contain special characters
			// On frontend side, decode it with decodeURIComponent()
			let encodedImageLink: string | null = null
			if (loginData.user.imageLink) {
				encodedImageLink = encodeURIComponent(loginData.user.imageLink)
			}

			res.redirect(
				`${
					process.env.CLIENT_URL
				}/account/success-google-login?accessToken=${
					loginData.tokens.accessToken
				}&id=${loginData.user.id}&email=${loginData.user.email}&role=${
					loginData.user.role
				}&name=${loginData.user.name}&surname=${
					loginData.user.surname
				}&phone=${loginData.user.phone || ''}&imageLink=${
					encodedImageLink || ''
				}`,
			)
		} catch (error) {
			res.redirect(
				`${String(
					process.env.API_URL,
				)}/api/account/google-login/failed`,
			)
		}
	}
}

export default new AccountController()

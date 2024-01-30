import bcrypt from 'bcrypt'
import * as uuid from 'uuid'
import HttpError from '../../utils/exceptions/http.error'
import awsService from '../aws/aws.service'
import emailService from '../email/email.service'
import { Image } from '../image/image.entity'
import imageService from '../image/image.service'
import TokenPayloadDto from '../token/dtos/token-payload.dto'
import tokenService from '../token/token.service'
import UserDto from '../user/dtos/user.dto'
import userService from '../user/user.service'
import ChangePasswordInputDto from './dtos/change-password-input.dto'
import EditInputDto from './dtos/edit-input.dto'
import GoogleLoginInputDto from './dtos/google-login-input.dto'
import LoginInputDto from './dtos/login-input.dto'
import LoginOutputDto from './dtos/login-output.dto'
import RefreshOutputDto from './dtos/refresh-output.dto'
import RegisterInputDto from './dtos/register-input.dto'

class AccountService {
	async hashPassword(password: string) {
		return await bcrypt.hash(password, 3)
	}

	/**
	 *
	 * @param user User data to register from request body
	 * @param image User image to register from request file (req.file), if Multer is used
	 * @returns Registered user data
	 */
	async register(
		user: RegisterInputDto,
		image?: Express.Multer.File,
	): Promise<UserDto> {
		const candidateByEmail = await userService.getByEmail(user.email)

		if (candidateByEmail) {
			throw HttpError.BadRequest(
				`User with email ${user.email} already exists`,
			)
		}

		if (user.phone) {
			const candidateByPhone = await userService.getByPhone(user.phone)

			if (candidateByPhone) {
				throw HttpError.BadRequest(
					`User with phone ${user.phone} already exists`,
				)
			}
		}

		let createdImage: Image | null = null

		if (image) {
			createdImage = await imageService.save(image)
		}

		const hashedPassword = await this.hashPassword(user.password)

		const createdUser = await userService.create({
			email: user.email,
			name: user.name,
			surname: user.surname,
			isVerified: false,
			phone: user.phone || null,
			password: hashedPassword,
			image: createdImage,
		})

		const verificationLink = `${process.env.API_URL}/api/account/verify/${createdUser.id}`

		await emailService.sendVerificationEmail(
			createdUser.email,
			verificationLink,
		)

		let imageLink: string | null = null

		if (createdImage) {
			imageLink = await awsService.getImageUrl(createdImage.name)
		}

		return {
			id: createdUser.id,
			email: createdUser.email,
			name: createdUser.name,
			surname: createdUser.surname,
			phone: createdUser.phone,
			imageLink,
			role: createdUser.role,
		}
	}

	/**
	 *
	 * @param changePasswordData Change password data. Contains old password, new password, password confirm and user id
	 */
	async changePassword(
		changePasswordData: ChangePasswordInputDto & { userId: string },
	) {
		const candidate = await userService.getById(changePasswordData.userId)

		if (!candidate) {
			throw HttpError.BadRequest(`User was not found`)
		}

		if (!candidate.password) {
			throw HttpError.BadRequest(
				'Password is incorrect. If you registered with google, then you can try to reset password',
			)
		}

		const isOldPasswordCorrect = await bcrypt.compare(
			changePasswordData.oldPassword,
			candidate.password,
		)

		if (!isOldPasswordCorrect) {
			throw HttpError.BadRequest('Old password is incorrect')
		}

		const isNewPasswordLikeOldPassword = await bcrypt.compare(
			changePasswordData.password,
			candidate.password,
		)

		if (isNewPasswordLikeOldPassword) {
			throw HttpError.BadRequest(
				'The new password you entered is the same as the old one. Enter a different password',
			)
		}

		const hashedPassword = await this.hashPassword(
			changePasswordData.password,
		)

		await userService.changePassword(candidate.id, hashedPassword)
	}

	async resetPassword(email: string, password: string) {
		const candidate = await userService.getByEmail(email)

		if (!candidate) {
			throw HttpError.BadRequest(`User was not found`)
		}

		if (candidate.password) {
			const isNewPasswordLikeOldPassword = await bcrypt.compare(
				password,
				candidate.password,
			)

			if (isNewPasswordLikeOldPassword) {
				throw HttpError.BadRequest(
					'The password you entered is the same as the old one. Enter a different password',
				)
			}
		}

		const hashedPassword = await this.hashPassword(password)

		await userService.changePassword(candidate.id, hashedPassword)
	}

	/**
	 * Sends reset password email to user email
	 * @param userEmail User email to send reset password email
	 * @returns Unique reset password id. This id is used to reset password
	 */
	async sendResetPasswordEmail(userEmail: string) {
		const candidateByEmail = await userService.getByEmail(userEmail)

		if (!candidateByEmail) {
			throw HttpError.NotFound(
				`User with email ${userEmail} was not found`,
			)
		}

		const uniqueResetPasswordId = uuid.v4()

		const resetPasswordLink = `${process.env.CLIENT_URL}/account/reset-password/${uniqueResetPasswordId}`

		await emailService.sendResetPasswordEmail(userEmail, resetPasswordLink)

		return uniqueResetPasswordId
	}

	/**
	 *
	 * @param user User data to edit from request body
	 * @param userId User id to edit
	 * @param image User image to edit from request file (req.file), if Multer is used
	 * @returns Edited user data
	 */
	async edit(
		user: EditInputDto,
		userId: string,
		image?: Express.Multer.File,
	): Promise<UserDto> {
		const candidate = await userService.getById(userId)

		if (!candidate) {
			throw HttpError.UnauthorizedError()
		}

		if (user.phone) {
			const candidateByPhone = await userService.getByPhone(user.phone)

			if (candidateByPhone && candidateByPhone.id !== candidate.id) {
				throw HttpError.BadRequest(
					`User with phone ${user.phone} already exists`,
				)
			}
		}

		let updatedImage = candidate.image

		if (image) {
			if (candidate.image) {
				updatedImage = await imageService.update(
					candidate.image.id,
					image,
				)
			} else {
				updatedImage = await imageService.save(image)
			}
		}

		const editedUser = await userService.edit({
			id: candidate.id,
			name: user.name,
			surname: user.surname,
			phone: user.phone || null,
			image: updatedImage,
		})

		let imageLink: string | null = null

		if (updatedImage) {
			imageLink = await awsService.getImageUrl(updatedImage.name)
		}

		return {
			id: editedUser.id,
			email: editedUser.email,
			name: editedUser.name,
			surname: editedUser.surname,
			phone: editedUser.phone,
			imageLink,
			role: candidate.role,
		}
	}

	/**
	 *
	 * @param userId User id to verify. This id is taken from request params
	 */
	async verify(userId: string) {
		await userService.verify(userId)
	}

	/**
	 *
	 * @param userCredentials User credentials to login from request body
	 * @returns Logged in user data and tokens
	 */
	async login(userCredentials: LoginInputDto): Promise<LoginOutputDto> {
		const candidate = await userService.getByEmail(userCredentials.email)

		if (!candidate) {
			throw HttpError.BadRequest(
				`User with email ${userCredentials.email} was not found`,
			)
		}

		if (!candidate.isVerified) {
			throw HttpError.Forbidden(
				`User is not verified. Please, verify ${candidate.email} email address by following the link in received email`,
			)
		}

		if (!candidate.password) {
			throw HttpError.BadRequest('Password is incorrect')
		}

		const isPasswordCorrect = await bcrypt.compare(
			userCredentials.password,
			candidate.password,
		)

		if (!isPasswordCorrect) {
			throw HttpError.BadRequest('Password is incorrect')
		}

		const tokenPayload: TokenPayloadDto = {
			id: candidate.id,
			email: candidate.email,
			role: candidate.role,
		}

		const tokens = tokenService.generateTokens(tokenPayload)

		await tokenService.save(candidate.id, tokens.refreshToken)

		let imageLink: string | null = null

		if (candidate.image) {
			imageLink = await awsService.getImageUrl(candidate.image.name)
		}

		return {
			tokens,
			user: {
				id: candidate.id,
				email: candidate.email,
				name: candidate.name,
				surname: candidate.surname,
				phone: candidate.phone,
				imageLink,
				role: candidate.role,
			},
		}
	}

	/**
	 *
	 * @param refreshToken User's, what is logging out, refresh token
	 */
	async logout(refreshToken: string) {
		await tokenService.remove(refreshToken)
	}

	/**
	 * Refreshes user's tokens
	 * @param refreshToken User's refresh token
	 * @returns Refreshed user's tokens data and tokens
	 */
	async refresh(refreshToken: string): Promise<RefreshOutputDto> {
		if (!refreshToken) {
			throw HttpError.UnauthorizedError()
		}

		const userData = tokenService.validateRefreshToken(refreshToken)

		const tokenFromDatabase = await tokenService.getByRefreshToken(
			refreshToken,
		)

		if (!tokenFromDatabase) {
			throw HttpError.UnauthorizedError()
		}

		//Find user by id in database to get and store fresh user data
		const freshUser = await userService.getById(userData.id)

		if (!freshUser) {
			throw HttpError.UnauthorizedError()
		}

		const tokenPayload: TokenPayloadDto = {
			id: freshUser.id,
			email: freshUser.email,
			role: freshUser.role,
		}

		const tokens = tokenService.generateTokens(tokenPayload)

		await tokenService.save(freshUser.id, tokens.refreshToken)

		let imageLink: string | null = null

		if (freshUser.image) {
			imageLink = await awsService.getImageUrl(freshUser.image.name)
		}

		return {
			tokens,
			user: {
				id: freshUser.id,
				email: freshUser.email,
				name: freshUser.name,
				surname: freshUser.surname,
				phone: freshUser.phone,
				imageLink,
				role: freshUser.role,
			},
		}
	}

	/**
	 * Logs in user with google account. If user with this email already exists, then just log in, otherwise create new user
	 * @param userData User data from google login
	 * @returns Logged in user data and tokens
	 */
	async googleLogin(userData?: Express.User): Promise<LoginOutputDto> {
		//Just typescript stuff. Checking if data is valid
		if (
			userData &&
			'_json' in userData &&
			typeof userData._json === 'object' &&
			userData._json &&
			'email' in userData._json &&
			typeof userData._json.email === 'string' &&
			'given_name' in userData._json &&
			typeof userData._json.given_name === 'string' &&
			'family_name' in userData._json &&
			typeof userData._json.family_name === 'string' &&
			'picture' in userData._json &&
			typeof userData._json.picture === 'string' &&
			'email_verified' in userData._json &&
			typeof userData._json.email_verified === 'boolean'
		) {
			if (!userData._json.email_verified) {
				throw HttpError.Forbidden(
					`Email ${userData._json.email} is not verified`,
				)
			}

			const user: GoogleLoginInputDto = {
				email: userData._json.email,
				name: userData._json.given_name,
				surname: userData._json.family_name,
				imageLink: userData._json.picture.split('=')[0],
			}

			let candidate = await userService.getByEmail(user.email)

			if (!candidate) {
				const createdImage = await imageService.saveFromUrl(
					user.imageLink,
				)

				candidate = await userService.create({
					email: user.email,
					name: user.name,
					surname: user.surname,
					phone: null,
					isVerified: true,
					password: null,
					image: createdImage,
				})
			}

			//If user is not verified, then verify him
			//This is needed because user can be created by default registration, but not verified
			if (!candidate.isVerified) {
				await this.verify(candidate.id)
			}

			const tokenPayload: TokenPayloadDto = {
				id: candidate.id,
				email: candidate.email,
				role: candidate.role,
			}

			const tokens = tokenService.generateTokens(tokenPayload)

			await tokenService.save(candidate.id, tokens.refreshToken)

			let imageLink: string | null = null

			if (candidate.image) {
				imageLink = await awsService.getImageUrl(candidate.image.name)
			}

			return {
				tokens,
				user: {
					id: candidate.id,
					email: candidate.email,
					name: candidate.name,
					surname: candidate.surname,
					phone: candidate.phone,
					imageLink,
					role: candidate.role,
				},
			}
		} else {
			throw HttpError.BadRequest('Invalid google user data')
		}
	}
}

export default new AccountService()

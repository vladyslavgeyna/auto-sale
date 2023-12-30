import bcrypt from 'bcrypt'
import HttpError from '../../utils/exceptions/http.error'
import emailService from '../email/email.service'
import { Image } from '../image/image.entity'
import imageService from '../image/image.service'
import TokenPayloadDto from '../token/dtos/token-payload.dto'
import tokenService from '../token/token.service'
import UserDto from '../user/dtos/user.dto'
import userService from '../user/user.service'
import LoginInputDto from './dtos/login-input.dto'
import LoginOutputDto from './dtos/login-output.dto'
import RefreshOutputDto from './dtos/refresh-output.dto'
import RegisterInputDto from './dtos/register-input.dto'

class AccountService {
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
			throw HttpError.BadRequest(`User with email ${user.email} already exists`)
		}

		const candidateByPhone = await userService.getByPhone(user.phone)

		if (candidateByPhone) {
			throw HttpError.BadRequest(`User with phone ${user.phone} already exists`)
		}

		let createdImage: Image | null = null

		if (image) {
			createdImage = await imageService.save(image)
		}

		const hashedPassword = await bcrypt.hash(user.password, 3)

		const createdUser = await userService.create({
			email: user.email,
			name: user.name,
			surname: user.surname,
			phone: user.phone,
			password: hashedPassword,
			image: createdImage,
		})

		const verificationLink = `${process.env.API_URL}/api/account/verify/${createdUser.id}`

		await emailService.sendVerificationEmail(
			createdUser.email,
			verificationLink,
		)

		return {
			id: createdUser.id,
			email: createdUser.email,
			name: createdUser.name,
			surname: createdUser.surname,
			phone: createdUser.phone,
			imageName: createdImage?.name || null,
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
			phone: candidate.phone,
			role: candidate.role,
		}

		const tokens = tokenService.generateTokens(tokenPayload)

		await tokenService.save(candidate.id, tokens.refreshToken)

		return {
			tokens,
			user: {
				id: candidate.id,
				email: candidate.email,
				name: candidate.name,
				surname: candidate.surname,
				phone: candidate.phone,
				imageName: candidate.image?.name || null,
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

		const tokenFromDatabase = await tokenService.getByRefreshToken(refreshToken)

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
			phone: freshUser.phone,
			role: freshUser.role,
		}

		const tokens = tokenService.generateTokens(tokenPayload)

		await tokenService.save(freshUser.id, tokens.refreshToken)

		return {
			tokens,
			user: {
				id: freshUser.id,
				email: freshUser.email,
				name: freshUser.name,
				surname: freshUser.surname,
				phone: freshUser.phone,
				imageName: freshUser.image?.name || null,
			},
		}
	}
}

export default new AccountService()

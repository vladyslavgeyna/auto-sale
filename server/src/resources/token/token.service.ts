import { Response } from 'express'
import jwt from 'jsonwebtoken'
import { Repository } from 'typeorm'
import { appDataSource } from '../../data-source'
import HttpError from '../../utils/exceptions/http.error'
import GenerateTokensOutputDto from './dtos/generate-tokens-output.dto'
import TokenPayloadDto from './dtos/token-payload.dto'
import { Token } from './token.entity'

class TokenService {
	private tokenRepository: Repository<Token>
	private ACCESS_TOKEN_EXPIRES_IN = '30m'
	private REFRESH_TOKEN_EXPIRES_IN = '30d'

	constructor() {
		this.tokenRepository = appDataSource.getRepository(Token)
	}

	/**
	 *
	 * @param payload token payload that represents user data
	 * @returns generated access and refresh tokens
	 */
	generateTokens(payload: TokenPayloadDto): GenerateTokensOutputDto {
		const jwtAccessSecret = String(process.env.JWT_ACCESS_SECRET)
		const jwtRefreshSecret = String(process.env.JWT_REFRESH_SECRET)

		const accessToken = jwt.sign(payload, jwtAccessSecret, {
			expiresIn: this.ACCESS_TOKEN_EXPIRES_IN,
		})

		const refreshToken = jwt.sign(payload, jwtRefreshSecret, {
			expiresIn: this.REFRESH_TOKEN_EXPIRES_IN,
		})

		return {
			accessToken,
			refreshToken,
		}
	}

	/**
	 * Saves refresh token to database. If the user already has refresh token, it will be updated
	 * @param userId user's id whose refresh token will be saved
	 * @param refreshToken refresh token to save
	 * @returns Saved refresh token entity
	 */
	async save(userId: string, refreshToken: string) {
		const token = await this.tokenRepository.findOneBy({
			user: { id: userId },
		})

		if (token) {
			token.refreshToken = refreshToken

			const updatedToken = await this.tokenRepository.save(token)

			return updatedToken
		}

		const createdToken = this.tokenRepository.create({
			user: { id: userId },
			refreshToken,
		})

		const newToken = await this.tokenRepository.save(createdToken)

		return newToken
	}

	/**
	 * Saves refresh token to httpOnly cookie for 30 days. If cookie already exists, it will be updated
	 * @param res express response object
	 * @param refreshToken refresh token to save in cookie
	 */
	saveRefreshTokenCookie(res: Response, refreshToken: string) {
		res.cookie('refreshToken', refreshToken, {
			httpOnly: true,
			maxAge: 30 * 24 * 60 * 60 * 1000,
		})
	}

	removeRefreshTokenCookie(res: Response) {
		res.clearCookie('refreshToken')
	}

	/**
	 * Removes refresh token from database
	 * @param refreshToken refresh token to remove
	 */
	async remove(refreshToken: string) {
		const token = await this.tokenRepository.findOneBy({ refreshToken })

		if (!token) {
			throw HttpError.UnauthorizedError()
		}

		await this.tokenRepository.delete(token.id)
	}

	/**
	 * Validates refresh token
	 * @param refreshToken refresh token to validate
	 * @returns token payload - user data, if refresh token is valid
	 */
	validateRefreshToken(refreshToken: string) {
		try {
			const jwtRefreshSecret = String(process.env.JWT_REFRESH_SECRET)

			const userData = jwt.verify(refreshToken, jwtRefreshSecret)

			return userData as TokenPayloadDto
		} catch (error) {
			throw HttpError.UnauthorizedError()
		}
	}

	/**
	 * Validates access token
	 * @param accessToken refresh token to validate
	 * @returns token payload - user data, if access token is valid
	 */
	validateAccessToken(accessToken: string) {
		try {
			const jwtAccessSecret = String(process.env.JWT_ACCESS_SECRET)

			const userData = jwt.verify(accessToken, jwtAccessSecret)

			return userData as TokenPayloadDto
		} catch (error) {
			throw HttpError.UnauthorizedError()
		}
	}

	/**
	 * Finds refresh token in database
	 * @param refreshToken refresh token to find
	 * @returns found refresh token entity if it exists, otherwise null
	 */
	async getByRefreshToken(refreshToken: string) {
		const token = await this.tokenRepository.findOneBy({
			refreshToken,
		})

		return token
	}
}

export default new TokenService()

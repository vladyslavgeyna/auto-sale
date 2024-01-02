import { Repository } from 'typeorm'
import { appDataSource } from '../../data-source'
import HttpError from '../../utils/exceptions/http.error'
import CreateUserInputDto from './dtos/create-user-input.dto'
import { User } from './user.entity'

class UserService {
	private userRepository: Repository<User>

	constructor() {
		this.userRepository = appDataSource.getRepository(User)
	}

	/**
	 *
	 * @param id User id to get
	 * @returns User if found, otherwise null
	 */
	async getById(id: string) {
		const user = await this.userRepository.findOne({
			where: {
				id,
			},
			relations: {
				image: true,
			},
		})

		return user
	}

	/**
	 * Verify user by id
	 * @param id User id to verify
	 */
	async verify(id: string) {
		const user = await this.getById(id)

		if (!user) {
			throw HttpError.NotFound('User not found')
		}

		user.isVerified = true

		await this.userRepository.save(user)
	}

	/**
	 *
	 * @param email User email to get
	 * @returns User if found, otherwise null
	 */
	async getByEmail(email: string) {
		const user = await this.userRepository.findOne({
			where: {
				email,
			},
			relations: {
				image: true,
			},
		})

		return user
	}

	/**
	 *
	 * @param phone User phone to get
	 * @returns User if found, otherwise null
	 */
	async getByPhone(phone: string) {
		const user = await this.userRepository.findOne({
			where: {
				phone,
			},
			relations: {
				image: true,
			},
		})

		return user
	}

	async create(user: CreateUserInputDto) {
		const newUser = this.userRepository.create(user)

		const createdUser = await this.userRepository.save(newUser)

		return createdUser
	}
}

export default new UserService()

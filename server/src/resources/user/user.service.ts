import { Repository } from 'typeorm'
import { appDataSource } from '../../data-source'
import CreateUserInputDto from './dtos/create-user-input.dto'
import { User } from './user.entity'

class UserService {
	private userRepository: Repository<User>

	constructor() {
		this.userRepository = appDataSource.getRepository(User)
	}

	async getByEmail(email: string) {
		const user = await this.userRepository.findOneBy({ email })

		return user
	}

	async getByPhone(phone: string) {
		const user = await this.userRepository.findOneBy({ phone })

		return user
	}

	async create(user: CreateUserInputDto) {
		const newUser = this.userRepository.create(user)

		const createdUser = await this.userRepository.save(newUser)

		return createdUser
	}
}

export default new UserService()

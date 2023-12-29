import bcrypt from 'bcrypt'
import HttpError from '../../utils/exceptions/http.error'
import emailService from '../email/email.service'
import { Image } from '../image/image.entity'
import imageService from '../image/image.service'
import userService from '../user/user.service'
import RegisterInputDto from './dtos/register-input.dto'
import RegisterOutputDto from './dtos/register-output.dto'

class AccountService {
	async register(
		user: RegisterInputDto,
		image?: Express.Multer.File,
	): Promise<RegisterOutputDto> {
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
}

export default new AccountService()

import { Image } from '../../image/image.entity'

export default interface CreateUserInputDto {
	email: string
	name: string
	surname: string
	password: string | null
	phone: string | null
	isVerified: boolean
	image: Image | null
}

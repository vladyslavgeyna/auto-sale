import { Image } from '../../image/image.entity'

export default interface CreateUserInputDto {
	email: string
	name: string
	surname: string
	password: string
	phone: string
	image: Image | null
}

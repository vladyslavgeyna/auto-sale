import { Image } from '../../image/image.entity'

export default interface EditUserInputDto {
	name: string
	surname: string
	phone: string | null
	image: Image | null
}

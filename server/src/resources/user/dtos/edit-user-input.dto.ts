import { Image } from '../../image/image.entity'

export default interface EditUserInputDto {
	id: string
	name: string
	surname: string
	phone: string | null
	image: Image | null
}

import { EnumDto } from '../../../utils/enums/enum.dto'

export default interface GetAdditionalDataOutputDto {
	regions: EnumDto[]
	wheelDrives: EnumDto[]
	carBrands: EnumDto[]
	transmissions: EnumDto[]
	fuels: EnumDto[]
	colors: EnumDto[]
}

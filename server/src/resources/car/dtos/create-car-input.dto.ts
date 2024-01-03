import { Color } from '../enums/color.enum'
import { Fuel } from '../enums/fuel.enum'
import { Region } from '../enums/region.enum'
import { Transmission } from '../enums/transmission.enum'
import { WheelDrive } from '../enums/wheel-drive.enum'

export default interface CreateCarInputDto {
	carBrand: { id: number }

	carModel: { id: number }

	yearOfProduction: number

	engineCapacity: number

	fuel: Fuel

	color: Color

	transmission: Transmission

	region: Region

	price: number

	wheelDrive: WheelDrive

	numberOfSeats: number

	mileage: number

	additionalOptions: string | null
}

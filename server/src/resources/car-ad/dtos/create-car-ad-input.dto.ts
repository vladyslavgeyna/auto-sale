import { Color } from '../../car/enums/color.enum'
import { Fuel } from '../../car/enums/fuel.enum'
import { Region } from '../../car/enums/region.enum'
import { Transmission } from '../../car/enums/transmission.enum'
import { WheelDrive } from '../../car/enums/wheel-drive.enum'

export default interface CreateCarAdInputDto {
	title: string

	text: string

	carBrandId: number

	carModelId: number

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

	additionalOptions?: string

	/**
	 * Original image name got from client
	 */
	mainImageName: string
}

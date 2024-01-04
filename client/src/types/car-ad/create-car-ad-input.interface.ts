export interface ICreateCarAdInput {
	title: string

	text: string

	carBrandId: number

	carModelId: number

	yearOfProduction: number

	engineCapacity: number

	fuel: string

	color: string

	transmission: string

	region: string

	price: number

	wheelDrive: string

	numberOfSeats: number

	mileage: number

	additionalOptions?: string

	mainImageName: string

	images: FileList | null
}

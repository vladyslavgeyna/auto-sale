export interface ICreateCarAdOutput {
	id: number

	carId: number

	title: string

	text: string

	carBrandId: number

	carModelId: number

	yearOfProduction: number

	engineCapacity: number

	fuel: number

	color: number

	transmission: number

	region: number

	price: number

	wheelDrive: number

	numberOfSeats: number

	mileage: number

	additionalOptions: string | null

	dateOfCreation: string
}

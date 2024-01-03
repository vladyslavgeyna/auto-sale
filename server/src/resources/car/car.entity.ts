import {
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm'
import { CarBrand } from '../car-brand/car-brand.entity'
import { CarImage } from '../car-image/car-image.entity'
import { CarModel } from '../car-model/car-model.entity'
import { Color } from './enums/color.enum'
import { Fuel } from './enums/fuel.enum'
import { Region } from './enums/region.enum'
import { Transmission } from './enums/transmission.enum'
import { WheelDrive } from './enums/wheel-drive.enum'

@Entity()
export class Car {
	@PrimaryGeneratedColumn()
	id: number

	@ManyToOne(() => CarBrand, { nullable: false })
	carBrand: CarBrand

	@ManyToOne(() => CarModel, { nullable: false })
	carModel: CarModel

	@Column()
	yearOfProduction: number

	@Column({ type: 'real' })
	engineCapacity: number

	@Column({
		type: 'enum',
		enum: Fuel,
	})
	fuel: Fuel

	@Column({
		type: 'enum',
		enum: Color,
	})
	color: Color

	@Column({
		type: 'enum',
		enum: Transmission,
	})
	transmission: Transmission

	@Column({
		type: 'enum',
		enum: Region,
	})
	region: Region

	@Column({ type: 'integer' })
	price: number

	@Column({
		type: 'enum',
		enum: WheelDrive,
	})
	wheelDrive: WheelDrive

	@Column()
	numberOfSeats: number

	@Column()
	mileage: number

	@Column({ type: 'text', nullable: true })
	additionalOptions: string | null

	@OneToMany(() => CarImage, carImage => carImage.car, { nullable: false })
	carImages: CarImage[]
}

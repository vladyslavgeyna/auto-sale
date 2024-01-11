import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { CarBrand } from '../car-brand/car-brand.entity'

@Entity()
export class CarModel {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	name: string

	@ManyToOne(() => CarBrand, { nullable: false })
	carBrand: CarBrand
}

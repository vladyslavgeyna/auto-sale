import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToOne,
	PrimaryGeneratedColumn,
} from 'typeorm'
import { Car } from '../car/car.entity'
import { Image } from '../image/image.entity'

@Entity()
export class CarImage {
	@PrimaryGeneratedColumn()
	id: number

	@OneToOne(() => Image, { nullable: false })
	@JoinColumn()
	image: Image

	@ManyToOne(() => Car, car => car.carImages, { nullable: false })
	@JoinColumn()
	car: Car

	@Column({ default: false })
	isMain: boolean
}

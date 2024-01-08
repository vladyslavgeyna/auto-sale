import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { CarAd } from '../car-ad/car-ad.entity'
import { User } from '../user/user.entity'

@Entity()
export class CarComparison {
	@PrimaryGeneratedColumn()
	id: number

	@ManyToOne(() => User)
	user: User

	@ManyToOne(() => CarAd)
	carAd: CarAd
}

import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { CarAd } from '../car-ad/car-ad.entity'
import { User } from '../user/user.entity'

@Entity()
export class FavoriteAd {
	@PrimaryGeneratedColumn()
	id: number

	@ManyToOne(() => User, { nullable: false })
	user: User

	@ManyToOne(() => CarAd, { nullable: false })
	carAd: CarAd
}

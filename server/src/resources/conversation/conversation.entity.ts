import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from '../user/user.entity'

@Entity()
export class Conversation {
	@PrimaryGeneratedColumn()
	id: number

	@ManyToOne(() => User, { nullable: false })
	firstMember: User

	@ManyToOne(() => User, { nullable: false })
	secondMember: User
}

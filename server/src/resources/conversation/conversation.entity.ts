import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from '../user/user.entity'

@Entity()
export class Conversation {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@ManyToOne(() => User, { nullable: false })
	firstMember: User

	@ManyToOne(() => User, { nullable: false })
	secondMember: User
}

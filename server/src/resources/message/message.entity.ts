import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm'
import { Conversation } from '../conversation/conversation.entity'
import { User } from '../user/user.entity'

@Entity()
export class Message {
	@PrimaryGeneratedColumn()
	id: number

	@ManyToOne(() => Conversation, { nullable: false })
	@JoinColumn()
	conversation: Conversation

	@ManyToOne(() => User, { nullable: false })
	sender: User

	@Column()
	text: string

	@Column({ type: 'timestamp' })
	dateOfCreation: Date
}

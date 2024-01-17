import {
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm'
import { Message } from '../message/message.entity'
import { User } from '../user/user.entity'

@Entity()
export class Conversation {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@ManyToOne(() => User, { nullable: false })
	firstMember: User

	@ManyToOne(() => User, { nullable: false })
	secondMember: User

	@Column({ type: 'timestamp', nullable: true })
	lastFirstMemberVisit: Date | null

	@Column({ type: 'timestamp', nullable: true })
	lastSecondMemberVisit: Date | null

	@OneToMany(() => Message, message => message.conversation, {
		nullable: false,
	})
	messages: Message[]
}

import {
	Column,
	Entity,
	JoinColumn,
	OneToOne,
	PrimaryGeneratedColumn,
} from 'typeorm'
import { User } from '../user/user.entity'

@Entity()
export class Token {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	refreshToken: string

	@OneToOne(() => User, user => user.token, { nullable: false })
	@JoinColumn()
	user: User
}

import {
	Column,
	Entity,
	JoinColumn,
	OneToOne,
	PrimaryGeneratedColumn,
} from 'typeorm'
import { Image } from '../image/image.entity'
import { Token } from '../token/token.entity'
import UserRole from './user-role.enum'

@Entity()
export class User {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column({ unique: true })
	email: string

	@Column()
	name: string

	@Column()
	surname: string

	@Column({ type: 'character varying', nullable: true })
	password: string | null

	@Column({ type: 'character varying', unique: true, nullable: true })
	phone: string | null

	@Column({ default: false })
	isVerified: boolean

	@OneToOne(() => Token, token => token.user)
	token: Token

	@Column({
		type: 'enum',
		enum: UserRole,
		default: UserRole.USER,
	})
	role: UserRole

	@OneToOne(() => Image, { nullable: true })
	@JoinColumn()
	image: Image | null
}

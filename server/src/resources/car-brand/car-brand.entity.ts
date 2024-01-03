import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class CarBrand {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ unique: true })
	name: string
}

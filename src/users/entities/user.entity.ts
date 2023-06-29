import { ApiProperty } from '@nestjs/swagger'
import {
	BeforeInsert,
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm'
import { hashSync } from 'bcrypt'

export enum UserRole {
	USER = 'user',
	ADMIN = 'admin'
}

@Entity()
export class User {
	@ApiProperty()
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	@ApiProperty()
	name: string

	@Column()
	@ApiProperty()
	email: string

	@Column({ nullable: false })
	@ApiProperty()
	password: string

	@Column({ type: 'varchar', default: UserRole.USER, name: 'userRole' })
	@ApiProperty()
	role: UserRole

	@ApiProperty()
	@Column({ default: true })
	status: boolean

	@CreateDateColumn({})
	@ApiProperty()
	createAt: Date

	@UpdateDateColumn({})
	@ApiProperty()
	updateAt: Date

	@DeleteDateColumn({})
	@ApiProperty()
	deletedAt: Date

	@BeforeInsert()
	hashPassword() {
		this.password = hashSync(this.password, 10)
	}
}

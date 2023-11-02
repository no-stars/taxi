import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm'
import { TypeOrmDriver } from '@infrastructure/typeorm/entities/typeorm-driver.entity'

@Entity('account')
export class TypeOrmAccount {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  phoneNumber: string

  @Column()
  email: string

  @OneToOne(
    type => TypeOrmDriver,
    driver => driver.account
  )
  driver: TypeOrmDriver

}

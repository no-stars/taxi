import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm'
import { TypeOrmDriver } from '@infrastructure/persistence/typeorm/entities/driver.entity'

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
    (driver: TypeOrmDriver) => driver.account
  )
  driver: TypeOrmDriver

}

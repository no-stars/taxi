import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm'
import { TypeOrmAccount } from '@infrastructure/typeorm/entities/typeorm-account.entity'

@Entity('driver')
export class TypeOrmDriver {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  lastName: string

  @Column()
  firstName: string

  @Column()
  middleName: string

  @Column()
  isWorking: boolean

  @OneToOne(
    type => TypeOrmAccount,
    account => account.driver
  )
  account: TypeOrmAccount

}

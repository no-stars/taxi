import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm'
import { TypeOrmAccount } from '@infrastructure/persistence/typeorm/entities/typeorm-account.entity'

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

  @Column()
  accountId: string

  @OneToOne(
    type => TypeOrmAccount,
    (account: TypeOrmAccount) => account.driver,
    { onDelete: 'CASCADE' }
  )
  @JoinColumn()
  account: TypeOrmAccount

}

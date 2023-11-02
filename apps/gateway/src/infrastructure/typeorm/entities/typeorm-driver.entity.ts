import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

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

}

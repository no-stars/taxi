import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('resource')
export class TypeOrmResource {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

}

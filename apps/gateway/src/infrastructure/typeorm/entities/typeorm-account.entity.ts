import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm'

@Entity('account')
export class TypeOrmDriver {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  phoneNumber: string

  @Column()
  email: string

  @OneToOne((type) => Question, (question) => question.categories)
  questions: Question[]

}

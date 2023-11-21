import { Expose } from 'class-transformer'
import { Nullable } from '@libs/common/types/nullable'

export type PgPassengerField = string | Date | null

export default class PgPassengerEntity {

  @Expose({ name: 'passenger_id' })
  id: string

  person_id: string

  created_at: Date

  updated_at: Date

  deleted_at:  Nullable<Date>

  getValues(): PgPassengerField[] {
    return [
      this.id,
      this.person_id,
      this.created_at,
      this.updated_at,
      this.deleted_at,
    ]
  }

}

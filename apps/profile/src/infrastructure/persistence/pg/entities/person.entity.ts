import { Expose } from 'class-transformer'
import { Nullable } from '@libs/common/types/nullable'

export type PgPersonField = string | Date | null

export default class PersonEntity {

  @Expose({ name: 'person_id' })
  id: string

  account_id: string

  first_name: string

  last_name: Nullable<string>

  middle_name: Nullable<string>

  created_at: Date

  updated_at: Date

  deleted_at: Nullable<Date>

  getValues(): PgPersonField[] {
    return [
      this.id,
      this.account_id,
      this.first_name,
      this.last_name,
      this.middle_name,
      this.created_at,
      this.updated_at,
      this.deleted_at,
    ]
  }

}

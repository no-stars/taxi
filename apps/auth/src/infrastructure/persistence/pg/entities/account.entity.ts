import { Expose } from 'class-transformer'
import { Nullable } from '@libs/common/types/nullable'

export type PgAccountField = string | Date | number | null

export default class AccountEntity {

  account_id: string

  phone_number: string

  email: Nullable<string>

  created_at: Date

  updated_at: Date

  deleted_at: Nullable<Date>

  getValues(): PgAccountField[] {
    return [
      this.account_id,
      this.phone_number,
      this.email,
      this.created_at,
      this.updated_at,
      this.deleted_at,
    ]
  }

}

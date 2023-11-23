import { Expose } from 'class-transformer'
import { Nullable } from '@libs/common/types/nullable'

export type PgWithdrawCardField = string | Date | null

export default class PgWithdrawCardEntity {

  @Expose({ name: 'withdraw_card_id' })
  id: string

  account_id: string

  card_type: string

  card_number: string

  created_at: Date

  updated_at: Date

  deleted_at: Nullable<Date>

  getValues(): PgWithdrawCardField[] {
    return [
      this.id,
      this.account_id,
      this.card_type,
      this.card_number,
      this.created_at,
      this.updated_at,
      this.deleted_at,
    ]
  }

}

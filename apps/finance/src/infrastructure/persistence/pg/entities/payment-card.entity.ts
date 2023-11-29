import { Expose } from 'class-transformer'
import { Nullable } from '@libs/common/types/nullable'

export type PgPaymentCardField = string | Date | null

export default class PaymentCardEntity {

  @Expose({ name: 'payment_card_id' })
  id: string

  account_id: string

  card_type: string

  expire_at: Date

  card_number: string

  cvv: string

  holder_name: string

  created_at: Date

  updated_at: Date

  deleted_at: Nullable<Date>

  getValues(): PgPaymentCardField[] {
    return [
      this.id,
      this.account_id,
      this.card_type,
      this.expire_at,
      this.card_number,
      this.cvv,
      this.holder_name,
      this.created_at,
      this.updated_at,
      this.deleted_at,
    ]
  }

}

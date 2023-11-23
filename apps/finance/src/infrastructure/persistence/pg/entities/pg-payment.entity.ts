import { Expose } from 'class-transformer'
import { Nullable } from '@libs/common/types/nullable'

export type PgPaymentField = string | Date | number | null

export default class PgPaymentEntity {

  @Expose({ name: 'payment_id' })
  id: string

  price: number

  payment_type: string

  receipt_url: Nullable<string>

  status: string

  created_at: Date

  updated_at: Date

  deleted_at: Nullable<Date>

  getValues(): PgPaymentField[] {
    return [
      this.id,
      this.price,
      this.payment_type,
      this.receipt_url,
      this.status,
      this.created_at,
      this.updated_at,
      this.deleted_at,
    ]
  }

}

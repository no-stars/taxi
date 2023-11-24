import { Expose } from 'class-transformer'
import { Nullable } from '@libs/common/types/nullable'

export type PgPriceProposeField = string | Date | null

export default class PgPriceProposeEntity {

  @Expose({ name: 'price_propose_id' })
  id: string

  order_id: string

  driver_id: string

  propose_type: string

  proposed_price: string

  result: string

  created_at: Date

  updated_at: Date

  deleted_at:  Nullable<Date>

  getValues(): PgPriceProposeField[] {
    return [
      this.id,
      this.order_id,
      this.driver_id,
      this.propose_type,
      this.proposed_price,
      this.result,
      this.created_at,
      this.updated_at,
      this.deleted_at,
    ]
  }

}

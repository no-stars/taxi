import { Expose } from 'class-transformer'
import { Nullable } from '@libs/common/types/nullable'

export type PgOrderField = string | Date | number | null

export default class OrderEntity {

  @Expose({ name: 'order_id' })
  id: string

  ride_id: Nullable<string>

  start_location: string

  finish_location: string

  passenger_id: string

  price_segment: string

  recommended_price: number

  price: number

  payment_type: string

  order_type: string

  created_at: Date

  updated_at: Date

  deleted_at:  Nullable<Date>

  getValues(): PgOrderField[] {
    return [
      this.id,
      this.ride_id,
      this.start_location,
      this.finish_location,
      this.passenger_id,
      this.price_segment,
      this.recommended_price,
      this.price,
      this.payment_type,
      this.order_type,
      this.created_at,
      this.updated_at,
      this.deleted_at,
    ]
  }

}

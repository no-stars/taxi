import { Expose } from 'class-transformer'
import { Nullable } from '@libs/common/types/nullable'

export type PgRideField = string | Date | null

export default class PgRideEntity {

  @Expose({ name: 'ride_id' })
  id: string

  start_time: Date

  pick_up_time: Nullable<Date>

  finish_time: Nullable<Date>

  driver_id: string

  car_id: string

  payment_id: string

  status: string

  created_at: Date

  updated_at: Date

  deleted_at:  Nullable<Date>

  getValues(): PgRideField[] {
    return [
      this.id,
      this.start_time,
      this.pick_up_time,
      this.finish_time,
      this.driver_id,
      this.car_id,
      this.payment_id,
      this.status,
      this.created_at,
      this.updated_at,
      this.deleted_at,
    ]
  }

}

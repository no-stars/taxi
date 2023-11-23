import { Expose } from 'class-transformer'
import { Nullable } from '@libs/common/types/nullable'

export type PgDriverActivityField = string | Date | null

export default class PgDriverActivityEntity {

  @Expose({ name: 'driver_activity_id' })
  id: string

  driver_id: string

  car_id: Nullable<string>

  status: string

  created_at: Date

  updated_at: Date

  deleted_at: Nullable<Date>

  getValues(): PgDriverActivityField[] {
    return [
      this.id,
      this.driver_id,
      this.car_id,
      this.status,
      this.created_at,
      this.updated_at,
      this.deleted_at,
    ]
  }

}

import { Expose } from 'class-transformer'
import { Nullable } from '@libs/common/types/nullable'

export type PgCarDriverField = string | Date | null

export default class CarDriverEntity {

  @Expose({ name: 'car_driver_id' })
  id: string

  driver_id: string

  car_id: string

  created_at: Date

  updated_at: Date

  deleted_at: Nullable<Date>

  getValues(): PgCarDriverField[] {
    return [
      this.id,
      this.driver_id,
      this.car_id,
      this.created_at,
      this.updated_at,
      this.deleted_at,
    ]
  }

}

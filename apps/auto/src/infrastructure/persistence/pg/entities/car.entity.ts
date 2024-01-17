import { Expose } from 'class-transformer'
import { Nullable } from '@libs/common/types/nullable'

export type PgCarField = string | Date | null

export default class CarEntity {

  @Expose({ name: 'car_id' })
  id: string

  car_model_id: string

  plate_number: string

  release_year: string

  created_at: Date

  updated_at: Date

  deleted_at: Nullable<Date>

  getValues(): PgCarField[] {
    return [
      this.id,
      this.car_model_id,
      this.plate_number,
      this.release_year,
      this.created_at,
      this.updated_at,
      this.deleted_at,
    ]
  }

}

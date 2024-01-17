import { Expose } from 'class-transformer'
import { Nullable } from '@libs/common/types/nullable'

export type PgCarModelField = string | Date | null

export default class CarModelEntity {

  @Expose({ name: 'car_model_id' })
  id: string

  car_brand: string

  model_name: string

  created_at: Date

  updated_at: Date

  deleted_at: Nullable<Date>

  getValues(): PgCarModelField[] {
    return [
      this.id,
      this.car_brand,
      this.model_name,
      this.created_at,
      this.updated_at,
      this.deleted_at,
    ]
  }

}

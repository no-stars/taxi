import { Expose } from 'class-transformer'
import { Nullable } from '@libs/common/types/nullable'

export type PgPriceSegmentRequirementField = string | Date | number | null

export default class PgPriceSegmentRequirementEntity {

  @Expose({ name: 'price_segment_requirement_id' })
  id: string

  price_segment: string

  car_model_id: string

  min_year: Nullable<number>

  created_at: Date

  updated_at: Date

  deleted_at: Nullable<Date>

  getValues(): PgPriceSegmentRequirementField[] {
    return [
      this.id,
      this.price_segment,
      this.car_model_id,
      this.min_year,
      this.created_at,
      this.updated_at,
      this.deleted_at,
    ]
  }

}

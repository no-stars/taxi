import { Expose } from 'class-transformer'
import { Nullable } from '@libs/common/types/nullable'

export type PgRatingField = string | Date | number | null

export default class PgRatingEntity {

  @Expose({ name: 'rating_id' })
  id: string

  ride_id: string

  stars_by_passenger: Nullable<number>

  stars_by_driver: Nullable<number>

  created_at: Date

  updated_at: Date

  deleted_at: Nullable<Date>

  getValues(): PgRatingField[] {
    return [
      this.id,
      this.ride_id,
      this.stars_by_passenger,
      this.stars_by_driver,
      this.created_at,
      this.updated_at,
      this.deleted_at,
    ]
  }

}

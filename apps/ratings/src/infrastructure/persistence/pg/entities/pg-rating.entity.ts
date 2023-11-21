import { Expose } from 'class-transformer'

export type PgRatingField = string | Date | number

export default class PgRatingEntity {

  @Expose({ name: 'rating_id' })
  id: string

  ride_id: string

  stars_by_passenger: number

  stars_by_driver: number

  created_at: Date

  updated_at: Date

  deleted_at: Date

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

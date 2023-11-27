import { Pool } from 'pg'
import { PgRatingRepositoryAdapter } from '@infrastructure/persistence/pg/repository/rating-repository.adapter'
import { StringUtils, ArrayUtils, NumberUtils } from '@libs/common/utils'
import { SEED_COUNT } from '@libs/common/constants'
import { Seed } from '@libs/common/interfaces'
import { Nullable } from '@libs/common/types/nullable'


export class RatingSeed implements Seed {

  private readonly ratingRepo: PgRatingRepositoryAdapter
  private readonly errors: Error[] = []

  constructor(private readonly pool: Pool) {
    this.ratingRepo = new PgRatingRepositoryAdapter(this.pool)
  }

  public async execute(): Promise<void> {
    console.log('RatingSeed start')

    for (const item of ArrayUtils.range(SEED_COUNT.ratings)) {
      const ratingData = RatingSeed.generateRatingData()
      try {
        await this.ratingRepo.addRating(ratingData)
      } catch (err) {
        this.errors.push(err)
      }
    }

    console.log('RatingSeed finished')
    console.log(`errors: ${this.errors}`)
  }

  private static generateRatingData(): any {
    const starsByPassenger: Nullable<number> = NumberUtils.randomInt(0, 5) || null
    const starsByDriver: Nullable<number> = NumberUtils.randomInt(0, 5) || null

    return {
      rating_id: StringUtils.uuid(),
      ride_id: StringUtils.uuid(),
      stars_by_passenger: starsByPassenger,
      stars_by_driver: starsByDriver,
      created_at: new Date(),
      updated_at: null,
      deleted_at: null,
    }
  }

}

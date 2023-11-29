import { Migration } from '@libs/common/interfaces'
import { Pool } from 'pg'


const createRatingIndexesQuery = `
CREATE INDEX IF NOT EXISTS idx_ratings_ride_id ON ratings (ride_id);
`

const dropRatingIndexesQuery = `
DROP INDEX IF EXISTS idx_ratings_ride_id;
`

export class RatingIndexes implements Migration {

  constructor(private readonly pool: Pool) {}

  public async up(): Promise<void> {
    console.log('RatingIndexes.up')
    await this.pool.query(createRatingIndexesQuery)
  }

  public async down(): Promise<void> {
    console.log('RatingIndexes.down')
    await this.pool.query(dropRatingIndexesQuery)
  }

}

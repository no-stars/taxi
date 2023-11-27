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

  public async up(): Promise<any> {
    console.log('RatingIndexes.up')
    return await this.pool.query(createRatingIndexesQuery)
  }

  public async down(): Promise<any> {
    console.log('RatingIndexes.down')
    return await this.pool.query(dropRatingIndexesQuery)
  }

}

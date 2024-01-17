import { Migration } from '@libs/common/interfaces'
import { Pool, QueryResult } from 'pg'


const createRatingIndexesQuery = `
CREATE INDEX IF NOT EXISTS idx_ratings_ride_id ON ratings (ride_id);
`

const dropRatingIndexesQuery = `
DROP INDEX IF EXISTS idx_ratings_ride_id;
`

export class RatingIndexes implements Migration {

  constructor(private readonly pool: Pool) {}

  public up(): Promise<QueryResult> {
    console.log('RatingIndexes.up')
    return this.pool.query(createRatingIndexesQuery)
  }

  public down(): Promise<QueryResult> {
    console.log('RatingIndexes.down')
    return this.pool.query(dropRatingIndexesQuery)
  }

}

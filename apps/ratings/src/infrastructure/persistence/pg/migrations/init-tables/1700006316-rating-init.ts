import { Migration } from '@libs/common/interfaces'
import { Pool, QueryResult } from 'pg'


const createRatingTableQuery = `
CREATE TABLE IF NOT EXISTS ratings (
  rating_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ride_id UUID NOT NULL UNIQUE,
  stars_by_passenger INTEGER CHECK (stars_by_passenger > 0 AND stars_by_passenger <= 5),
  stars_by_driver INTEGER CHECK (stars_by_driver > 0 AND stars_by_driver <= 5),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ
);
`

const dropRatingTableQuery = `
DROP TABLE IF EXISTS ratings;
`

export class RatingInit implements Migration {

  constructor(private readonly pool: Pool) {}

  public up(): Promise<QueryResult> {
    console.log('RatingInit.up')
    return this.pool.query(createRatingTableQuery)
  }

  public down(): Promise<QueryResult> {
    console.log('RatingInit.down')
    return this.pool.query(dropRatingTableQuery)
  }

}

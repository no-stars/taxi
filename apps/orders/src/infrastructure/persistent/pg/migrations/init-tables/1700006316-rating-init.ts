import MigrationInterface from '@infrastructure/persistent/pg/migrations/migration.interface'
import { Pool } from 'pg'


const createRatingTableQuery = `
CREATE TABLE IF NOT EXISTS ratings (
  rating_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ride_id UUID NOT NULL,
  stars_by_passenger INTEGER CHECK (stars_by_passenger > 0 AND stars_by_passenger <= 5),
  stars_by_driver INTEGER CHECK (stars_by_driver > 0 AND stars_by_driver <= 5),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz,
  deleted_at timestamptz
);
`

const dropRatingTableQuery = `
DROP TABLE ratings;
`

export class RatingInit implements MigrationInterface {

  constructor(private readonly pool: Pool) {}

  public async up(): Promise<any> {
    console.log('RatingInit.up')
    return await this.pool.query(createRatingTableQuery)
  }

  public async down(): Promise<any> {
    console.log('RatingInit.down')
    return await this.pool.query(dropRatingTableQuery)
  }

}

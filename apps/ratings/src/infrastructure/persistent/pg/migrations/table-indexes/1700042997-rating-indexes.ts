import MigrationInterface from '@infrastructure/persistent/pg/migrations/migration.interface'
import { Pool } from 'pg'


const createRatingIndexesQuery = `
CREATE INDEX idx_ratings_ride_id ON ratings (ride_id);
`

const dropRatingIndexesQuery = `
DROP INDEX idx_ratings_ride_id;
`

export class RatingIndexes implements MigrationInterface {

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

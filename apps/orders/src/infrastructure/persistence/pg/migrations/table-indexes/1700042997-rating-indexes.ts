import MigrationInterface from '@infrastructure/persistence/pg/migrations/migration.interface'
import { Pool } from 'pg'


const createRatingIndexesQuery = `
CREATE INDEX idx_ratings_ride_id ON ratings (ride_id);
CREATE INDEX idx_ratings_passenger_id ON ratings (passenger_id);
CREATE INDEX idx_ratings_driver_id ON ratings (driver_id);
`

const dropRatingIndexesQuery = `
DROP INDEX idx_ratings_ride_id;
DROP INDEX idx_ratings_passenger_id;
DROP INDEX idx_ratings_driver_id;
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

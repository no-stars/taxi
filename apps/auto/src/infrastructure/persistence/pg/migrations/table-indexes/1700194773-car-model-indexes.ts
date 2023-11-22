import MigrationInterface from '@infrastructure/persistence/pg/migrations/migration.interface'
import { Pool } from 'pg'


const createCarModelIndexesQuery = `
CREATE INDEX idx_car_model_car_brand ON car_models (car_brand);
`

const dropCarModelIndexesQuery = `
DROP INDEX idx_car_model_car_brand;
`

export class CarModelIndexes implements MigrationInterface {

  constructor(private readonly pool: Pool) {}

  public async up(): Promise<any> {
    console.log('CarModelIndexes.up')
    return await this.pool.query(createCarModelIndexesQuery)
  }

  public async down(): Promise<any> {
    console.log('CarModelIndexes.down')
    return await this.pool.query(dropCarModelIndexesQuery)
  }

}

import { Migration } from '@libs/common/interfaces'
import { Pool } from 'pg'


const createCarModelIndexesQuery = `
CREATE INDEX IF NOT EXISTS idx_car_model_car_brand ON car_models (car_brand);
`

const dropCarModelIndexesQuery = `
DROP INDEX IF EXISTS idx_car_model_car_brand;
`

export class CarModelIndexes implements Migration {

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

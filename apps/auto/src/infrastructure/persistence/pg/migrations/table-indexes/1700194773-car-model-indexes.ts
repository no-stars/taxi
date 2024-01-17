import { Migration } from '@libs/common/interfaces'
import { Pool, QueryResult } from 'pg'


const createCarModelIndexesQuery = `
CREATE INDEX IF NOT EXISTS idx_car_model_car_brand ON car_models (car_brand);
`

const dropCarModelIndexesQuery = `
DROP INDEX IF EXISTS idx_car_model_car_brand;
`

export class CarModelIndexes implements Migration {

  constructor(private readonly pool: Pool) {}

  public up(): Promise<QueryResult> {
    console.log('CarModelIndexes.up')
    return this.pool.query(createCarModelIndexesQuery)
  }

  public down(): Promise<QueryResult> {
    console.log('CarModelIndexes.down')
    return this.pool.query(dropCarModelIndexesQuery)
  }

}

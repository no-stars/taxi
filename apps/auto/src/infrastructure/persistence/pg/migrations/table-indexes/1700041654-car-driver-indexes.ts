import { Migration } from '@libs/common/interfaces'
import { Pool, QueryResult } from 'pg'


const createCarDriverIndexesQuery = `
CREATE INDEX IF NOT EXISTS idx_car_drivers_car_id ON car_drivers (car_id);
CREATE INDEX IF NOT EXISTS idx_car_drivers_driver_id ON car_drivers (driver_id);
`

const dropCarDriverIndexesQuery = `
DROP INDEX IF EXISTS idx_car_drivers_car_id;
DROP INDEX IF EXISTS idx_car_drivers_driver_id;
`

export class CarDriverIndexes implements Migration {

  constructor(private readonly pool: Pool) {}

  public up(): Promise<QueryResult> {
    console.log('CarDriverIndexes.up')
    return this.pool.query(createCarDriverIndexesQuery)
  }

  public down(): Promise<QueryResult> {
    console.log('CarDriverIndexes.down')
    return this.pool.query(dropCarDriverIndexesQuery)
  }

}

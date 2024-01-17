import { Migration } from '@libs/common/interfaces'
import { Pool, QueryResult } from 'pg'


const createRideIndexesQuery = `
CREATE INDEX IF NOT EXISTS idx_rides_driver_id ON rides (driver_id);
`

const dropRideIndexesQuery = `
DROP INDEX IF EXISTS idx_rides_driver_id;
`

export class RideIndexes implements Migration {

  constructor(private readonly pool: Pool) {}

  public up(): Promise<QueryResult> {
    console.log('RideIndexes.up')
    return this.pool.query(createRideIndexesQuery)
  }

  public down(): Promise<QueryResult> {
    console.log('RideIndexes.down')
    return this.pool.query(dropRideIndexesQuery)
  }

}

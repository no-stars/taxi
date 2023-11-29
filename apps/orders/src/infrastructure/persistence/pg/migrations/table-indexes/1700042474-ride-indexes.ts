import { Migration } from '@libs/common/interfaces'
import { Pool } from 'pg'


const createRideIndexesQuery = `
CREATE INDEX IF NOT EXISTS idx_rides_driver_id ON rides (driver_id);
`

const dropRideIndexesQuery = `
DROP INDEX IF EXISTS idx_rides_driver_id;
`

export class RideIndexes implements Migration {

  constructor(private readonly pool: Pool) {}

  public async up(): Promise<void> {
    console.log('RideIndexes.up')
    await this.pool.query(createRideIndexesQuery)
  }

  public async down(): Promise<void> {
    console.log('RideIndexes.down')
    await this.pool.query(dropRideIndexesQuery)
  }

}

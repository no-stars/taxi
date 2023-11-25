import { Migration } from '@libs/common/interfaces'
import { Pool } from 'pg'


const createRideIndexesQuery = `
CREATE INDEX idx_rides_driver_id ON rides (driver_id);
`

const dropRideIndexesQuery = `
DROP INDEX idx_rides_driver_id;
`

export class RideIndexes implements Migration {

  constructor(private readonly pool: Pool) {}

  public async up(): Promise<any> {
    console.log('RideIndexes.up')
    return await this.pool.query(createRideIndexesQuery)
  }

  public async down(): Promise<any> {
    console.log('RideIndexes.down')
    return await this.pool.query(dropRideIndexesQuery)
  }

}

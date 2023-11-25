import { Migration } from '@libs/common/interfaces'
import { Pool } from 'pg'


const createDriverActivityIndexesQuery = `
CREATE INDEX idx_driver_activities_created_at_driver_id ON driver_activities (created_at, driver_id);
`

const dropDriverActivityIndexesQuery = `
DROP INDEX idx_driver_activities_created_at_driver_id;
`

export class DriverActivityIndexes implements Migration {

  constructor(private readonly pool: Pool) {}

  public async up(): Promise<any> {
    console.log('DriverActivityIndexes.up')
    return await this.pool.query(createDriverActivityIndexesQuery)
  }

  public async down(): Promise<any> {
    console.log('DriverActivityIndexes.down')
    return await this.pool.query(dropDriverActivityIndexesQuery)
  }

}

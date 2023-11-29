import { Migration } from '@libs/common/interfaces'
import { Pool } from 'pg'


const createDriverActivityIndexesQuery = `
CREATE INDEX IF NOT EXISTS idx_driver_activities_created_at_driver_id ON driver_activities (created_at DESC, driver_id);
`

const dropDriverActivityIndexesQuery = `
DROP INDEX IF EXISTS idx_driver_activities_created_at_driver_id;
`

export class DriverActivityIndexes implements Migration {

  constructor(private readonly pool: Pool) {}

  public async up(): Promise<void> {
    console.log('DriverActivityIndexes.up')
    await this.pool.query(createDriverActivityIndexesQuery)
  }

  public async down(): Promise<void> {
    console.log('DriverActivityIndexes.down')
    await this.pool.query(dropDriverActivityIndexesQuery)
  }

}

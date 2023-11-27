import { Migration } from '@libs/common/interfaces'
import { Pool } from 'pg'


const createShiftIndexesQuery = `
CREATE INDEX IF NOT EXISTS idx_shifts_created_at_driver_id ON shifts (created_at DESC, driver_id);
`

const dropShiftIndexesQuery = `
DROP INDEX IF EXISTS idx_shifts_created_at_driver_id;
`

export class ShiftIndexes implements Migration {

  constructor(private readonly pool: Pool) {}

  public async up(): Promise<any> {
    console.log('ShiftIndexes.up')
    return await this.pool.query(createShiftIndexesQuery)
  }

  public async down(): Promise<any> {
    console.log('ShiftIndexes.down')
    return await this.pool.query(dropShiftIndexesQuery)
  }

}

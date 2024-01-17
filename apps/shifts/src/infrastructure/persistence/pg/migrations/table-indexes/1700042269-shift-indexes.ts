import { Migration } from '@libs/common/interfaces'
import { Pool, QueryResult } from 'pg'


const createShiftIndexesQuery = `
CREATE INDEX IF NOT EXISTS idx_shifts_created_at_driver_id ON shifts (created_at DESC, driver_id);
`

const dropShiftIndexesQuery = `
DROP INDEX IF EXISTS idx_shifts_created_at_driver_id;
`

export class ShiftIndexes implements Migration {

  constructor(private readonly pool: Pool) {}

  public up(): Promise<QueryResult> {
    console.log('ShiftIndexes.up')
    return this.pool.query(createShiftIndexesQuery)
  }

  public down(): Promise<QueryResult> {
    console.log('ShiftIndexes.down')
    return this.pool.query(dropShiftIndexesQuery)
  }

}

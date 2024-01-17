import { Migration } from '@libs/common/interfaces'
import { Pool, QueryResult } from 'pg'


const createShiftTableQuery = `
CREATE TABLE IF NOT EXISTS shifts (
  shift_id UUID PRIMARY KEY,
  driver_id UUID NOT NULL,
  shift_type_id UUID NOT NULL,
  payment_id UUID NOT NULL,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ
);
`

const dropShiftTableQuery = `
DROP TABLE IF EXISTS shifts;
`

export class ShiftInit implements Migration {

  constructor(private readonly pool: Pool) {}

  public up(): Promise<QueryResult> {
    console.log('ShiftInit.up')
    return this.pool.query(createShiftTableQuery)
  }

  public down(): Promise<QueryResult> {
    console.log('ShiftInit.down')
    return this.pool.query(dropShiftTableQuery)
  }

}

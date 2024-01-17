import { Migration } from '@libs/common/interfaces'
import { Pool, QueryResult } from 'pg'


const createShiftTypeTableQuery = `
CREATE TABLE IF NOT EXISTS shift_types (
  shift_type_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shift_name TEXT NOT NULL UNIQUE,
  price INTEGER NOT NULL,
  working_hours INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ
);
`

const dropShiftTypeTableQuery = `
DROP TABLE IF EXISTS shift_types;
`

export class ShiftTypeInit implements Migration {

  constructor(private readonly pool: Pool) {}

  public up(): Promise<QueryResult> {
    console.log('ShiftTypeInit.up')
    return this.pool.query(createShiftTypeTableQuery)
  }

  public down(): Promise<QueryResult> {
    console.log('ShiftTypeInit.down')
    return this.pool.query(dropShiftTypeTableQuery)
  }

}

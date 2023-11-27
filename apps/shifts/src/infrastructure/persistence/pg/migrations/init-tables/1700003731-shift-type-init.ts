import { Migration } from '@libs/common/interfaces'
import { Pool } from 'pg'


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

  public async up(): Promise<any> {
    console.log('ShiftTypeInit.up')
    return await this.pool.query(createShiftTypeTableQuery)
  }

  public async down(): Promise<any> {
    console.log('ShiftTypeInit.down')
    return await this.pool.query(dropShiftTypeTableQuery)
  }

}

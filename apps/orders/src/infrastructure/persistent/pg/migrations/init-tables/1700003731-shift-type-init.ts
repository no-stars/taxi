import MigrationInterface from '@infrastructure/persistent/pg/migrations/migration.interface'
import { Pool } from 'pg'


const createShiftTypeTableQuery = `
CREATE TABLE IF NOT EXISTS shift_types (
  shift_type_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shift_name TEXT NOT NULL UNIQUE,
  price INTEGER NOT NULL,
  working_hours INTEGER NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz,
  deleted_at timestamptz
);
`

const dropShiftTypeTableQuery = `
DROP TABLE shift_types;
`

export class ShiftTypeInit implements MigrationInterface {

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

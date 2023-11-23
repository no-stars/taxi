import MigrationInterface from '@infrastructure/persistence/pg/migrations/migration.interface'
import { Pool } from 'pg'


const createShiftTableQuery = `
CREATE TABLE IF NOT EXISTS shifts (
  shift_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  driver_id UUID NOT NULL,
  shift_type_id UUID NOT NULL,
  payment_id UUID NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ
);
`

const dropShiftTableQuery = `
DROP TABLE shifts;
`

export class ShiftInit implements MigrationInterface {

  constructor(private readonly pool: Pool) {}

  public async up(): Promise<any> {
    console.log('ShiftInit.up')
    return await this.pool.query(createShiftTableQuery)
  }

  public async down(): Promise<any> {
    console.log('ShiftInit.down')
    return await this.pool.query(dropShiftTableQuery)
  }

}

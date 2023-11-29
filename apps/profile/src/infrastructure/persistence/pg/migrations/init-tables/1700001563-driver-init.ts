import { Migration } from '@libs/common/interfaces'
import { Pool } from 'pg'


const createDriverTableQuery = `
CREATE TABLE IF NOT EXISTS drivers (
  driver_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  person_id UUID NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ
);
`

const dropDriverTableQuery = `
DROP TABLE IF EXISTS drivers;
`

export class DriverInit implements Migration {

  constructor(private readonly pool: Pool) {}

  public async up(): Promise<void> {
    console.log('DriverInit.up')
    await this.pool.query(createDriverTableQuery)
  }

  public async down(): Promise<void> {
    console.log('DriverInit.down')
    await this.pool.query(dropDriverTableQuery)
  }

}

import MigrationInterface from '@infrastructure/persistent/pg/migrations/migration.interface'
import { Pool } from 'pg'


const createDriverTableQuery = `
CREATE TABLE IF NOT EXISTS drivers (
  driver_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  person_id UUID,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ
);
`

const dropDriverTableQuery = `
DROP TABLE drivers;
`

export class DriverInit implements MigrationInterface {

  constructor(private readonly pool: Pool) {}

  public async up(): Promise<any> {
    console.log('DriverInit.up')
    return await this.pool.query(createDriverTableQuery)
  }

  public async down(): Promise<any> {
    console.log('DriverInit.down')
    return await this.pool.query(dropDriverTableQuery)
  }

}

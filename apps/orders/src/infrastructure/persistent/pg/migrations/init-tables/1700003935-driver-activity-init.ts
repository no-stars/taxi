import MigrationInterface from '@infrastructure/persistent/pg/migrations/migration.interface'
import { Pool } from 'pg'


const createDriverActivityTableQuery = `
CREATE TABLE IF NOT EXISTS driver_activities (
  driver_activity_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  driver_id UUID NOT NULL,
  status TEXT NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz,
  deleted_at timestamptz
);
`

const dropDriverActivityTableQuery = `
DROP TABLE driver_activities;
`

export class DriverActivityInit implements MigrationInterface {

  constructor(private readonly pool: Pool) {}

  public async up(): Promise<any> {
    console.log('DriverActivityInit.up')
    return await this.pool.query(createDriverActivityTableQuery)
  }

  public async down(): Promise<any> {
    console.log('DriverActivityInit.down')
    return await this.pool.query(dropDriverActivityTableQuery)
  }

}

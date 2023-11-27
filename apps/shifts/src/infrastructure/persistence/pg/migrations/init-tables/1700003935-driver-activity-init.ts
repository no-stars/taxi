import { Migration } from '@libs/common/interfaces'
import { Pool } from 'pg'


const createDriverActivityTableQuery = `
CREATE TABLE IF NOT EXISTS driver_activities (
  driver_activity_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  driver_id UUID NOT NULL,
  car_id UUID,
  status TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ
);
`

const dropDriverActivityTableQuery = `
DROP TABLE IF EXISTS driver_activities;
`

export class DriverActivityInit implements Migration {

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

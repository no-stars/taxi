import { Migration } from '@libs/common/interfaces'
import { Pool, QueryResult } from 'pg'


const createDriverActivityTableQuery = `
CREATE TABLE IF NOT EXISTS driver_activities (
  driver_activity_id UUID PRIMARY KEY,
  driver_id UUID NOT NULL,
  car_id UUID,
  status TEXT NOT NULL,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ
);
`

const dropDriverActivityTableQuery = `
DROP TABLE IF EXISTS driver_activities;
`

export class DriverActivityInit implements Migration {

  constructor(private readonly pool: Pool) {}

  public up(): Promise<QueryResult> {
    console.log('DriverActivityInit.up')
    return this.pool.query(createDriverActivityTableQuery)
  }

  public down(): Promise<QueryResult> {
    console.log('DriverActivityInit.down')
    return this.pool.query(dropDriverActivityTableQuery)
  }

}

import { Migration } from '@libs/common/interfaces'
import { Pool, QueryResult } from 'pg'


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

  public up(): Promise<QueryResult> {
    console.log('DriverInit.up')
    return this.pool.query(createDriverTableQuery)
  }

  public down(): Promise<QueryResult> {
    console.log('DriverInit.down')
    return this.pool.query(dropDriverTableQuery)
  }

}

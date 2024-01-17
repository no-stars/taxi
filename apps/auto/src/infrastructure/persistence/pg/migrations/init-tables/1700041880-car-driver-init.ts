import { Migration } from '@libs/common/interfaces'
import { Pool, QueryResult } from 'pg'


const createCarDriverTableQuery = `
CREATE TABLE IF NOT EXISTS car_drivers (
  car_driver_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  driver_id UUID NOT NULL,
  car_id UUID NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ
);
`

const dropCarDriverTableQuery = `
DROP TABLE IF EXISTS car_drivers;
`

export class CarDriverInit implements Migration {

  constructor(private readonly pool: Pool) {}

  public up(): Promise<QueryResult> {
    console.log('CarDriverInit.up')
    return this.pool.query(createCarDriverTableQuery)
  }

  public down(): Promise<QueryResult> {
    console.log('CarDriverInit.down')
    return this.pool.query(dropCarDriverTableQuery)
  }

}

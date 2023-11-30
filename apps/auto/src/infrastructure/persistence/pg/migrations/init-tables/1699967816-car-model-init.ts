import { Migration } from '@libs/common/interfaces'
import { Pool, QueryResult } from 'pg'


const createCarModelTableQuery = `
CREATE TABLE IF NOT EXISTS car_models (
  car_model_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  car_brand TEXT NOT NULL,
  model_name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ
);
`

const dropCarModelTableQuery = `
DROP TABLE IF EXISTS car_models;
`

export class CarModelInit implements Migration {

  constructor(private readonly pool: Pool) {}

  public up(): Promise<QueryResult> {
    console.log('CarModelInit.up')
    return this.pool.query(createCarModelTableQuery)
  }

  public down(): Promise<QueryResult> {
    console.log('CarModelInit.down')
    return this.pool.query(dropCarModelTableQuery)
  }

}

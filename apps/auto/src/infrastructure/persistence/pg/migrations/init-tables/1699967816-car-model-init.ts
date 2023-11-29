import { Migration } from '@libs/common/interfaces'
import { Pool } from 'pg'


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

  public async up(): Promise<void> {
    console.log('CarModelInit.up')
    await this.pool.query(createCarModelTableQuery)
  }

  public async down(): Promise<void> {
    console.log('CarModelInit.down')
    await this.pool.query(dropCarModelTableQuery)
  }

}

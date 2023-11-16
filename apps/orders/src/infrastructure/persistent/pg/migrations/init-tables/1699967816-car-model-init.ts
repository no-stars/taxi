import MigrationInterface from '@infrastructure/persistent/pg/migrations/migration.interface'
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
DROP TABLE car_models;
`

export class CarModelInit implements MigrationInterface {

  constructor(private readonly pool: Pool) {}

  public async up(): Promise<any> {
    console.log('CarModelInit.up')
    return await this.pool.query(createCarModelTableQuery)
  }

  public async down(): Promise<any> {
    console.log('CarModelInit.down')
    return await this.pool.query(dropCarModelTableQuery)
  }

}

import { Migration } from '@libs/common/interfaces'
import { Pool } from 'pg'


const createCarTableQuery = `
CREATE TABLE IF NOT EXISTS cars (
  car_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  car_model_id UUID NOT NULL,
  plate_number TEXT NOT NULL,
  release_year INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ
);
`

const dropCarTableQuery = `
DROP TABLE IF EXISTS cars;
`

export class CarInit implements Migration {

  constructor(private readonly pool: Pool) {}

  public async up(): Promise<void> {
    console.log('CarInit.up')
    await this.pool.query(createCarTableQuery)
  }

  public async down(): Promise<void> {
    console.log('CarInit.down')
    await this.pool.query(dropCarTableQuery)
  }

}

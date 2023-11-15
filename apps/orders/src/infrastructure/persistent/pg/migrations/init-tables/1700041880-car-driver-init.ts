import MigrationInterface from '@infrastructure/persistent/pg/migrations/migration.interface'
import { Pool } from 'pg'


const createCarDriverTableQuery = `
CREATE TABLE IF NOT EXISTS car_drivers (
  car_driver_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  driver_id UUID NOT NULL,
  car_id UUID NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz,
  deleted_at timestamptz
);
`

const dropCarDriverTableQuery = `
DROP TABLE ratings;
`

export class CarDriverInit implements MigrationInterface {

  constructor(private readonly pool: Pool) {}

  public async up(): Promise<any> {
    console.log('CarDriverInit.up')
    return await this.pool.query(createCarDriverTableQuery)
  }

  public async down(): Promise<any> {
    console.log('CarDriverInit.down')
    return await this.pool.query(dropCarDriverTableQuery)
  }

}

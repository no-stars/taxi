import MigrationInterface from '@infrastructure/persistent/pg/migrations/migration.interface'
import { Pool } from 'pg'


const createRideTableQuery = `
CREATE TABLE IF NOT EXISTS rides (
  ride_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  start_time DATE NOT NULL,
  pick_up_time DATE,
  finish_time DATE,
  driver_id UUID NOT NULL,
  car_id UUID NOT NULL,
  payment_id UUID NOT NULL,
  status TEXT NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz,
  deleted_at timestamptz
);
`

const dropRideTableQuery = `
DROP TABLE rides;
`

export class RideInit implements MigrationInterface {

  constructor(private readonly pool: Pool) {}

  public async up(): Promise<any> {
    console.log('RideInit.up')
    return await this.pool.query(createRideTableQuery)
  }

  public async down(): Promise<any> {
    console.log('RideInit.down')
    return await this.pool.query(dropRideTableQuery)
  }

}

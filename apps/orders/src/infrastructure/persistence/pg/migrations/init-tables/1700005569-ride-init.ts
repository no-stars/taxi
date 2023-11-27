import { Migration } from '@libs/common/interfaces'
import { Pool } from 'pg'


const createRideTableQuery = `
CREATE TABLE IF NOT EXISTS rides (
  ride_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  start_time TIMESTAMPTZ NOT NULL,
  pick_up_time TIMESTAMPTZ,
  finish_time TIMESTAMPTZ,
  driver_id UUID NOT NULL,
  car_id UUID NOT NULL,
  payment_id UUID NOT NULL,
  status TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ
);
`

const dropRideTableQuery = `
DROP TABLE IF EXISTS rides;
`

export class RideInit implements Migration {

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

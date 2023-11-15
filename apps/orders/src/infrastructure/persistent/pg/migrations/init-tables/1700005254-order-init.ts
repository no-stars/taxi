import MigrationInterface from '@infrastructure/persistent/pg/migrations/migration.interface'
import { Pool } from 'pg'


const createOrderTableQuery = `
CREATE TABLE IF NOT EXISTS orders (
  order_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ride_id UUID NOT NULL,
  start_location POINT NOT NULL,
  finish_location POINT NOT NULL,
  passenger_id UUID NOT NULL,
  price_segment TEXT NOT NULL,
  recommended_price INTEGER NOT NULL,
  price INTEGER NOT NULL,
  payment_type TEXT NOT NULL,
  order_type TEXT NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz,
  deleted_at timestamptz
);
`

const dropOrderTableQuery = `
DROP TABLE orders;
`

export class OrderInit implements MigrationInterface {

  constructor(private readonly pool: Pool) {}

  public async up(): Promise<any> {
    console.log('OrderInit.up')
    return await this.pool.query(createOrderTableQuery)
  }

  public async down(): Promise<any> {
    console.log('OrderInit.down')
    return await this.pool.query(dropOrderTableQuery)
  }

}

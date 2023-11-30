import { Migration } from '@libs/common/interfaces'
import { Pool, QueryResult } from 'pg'


//  start_location GEOMETRY(Point, 4326) NOT NULL,
//  finish_location GEOMETRY(Point, 4326) NOT NULL,
const createOrderTableQuery = `
CREATE TABLE IF NOT EXISTS orders (
  order_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ride_id UUID,
  start_location POINT NOT NULL,
  finish_location POINT NOT NULL,
  passenger_id UUID NOT NULL,
  price_segment TEXT NOT NULL,
  recommended_price INTEGER NOT NULL,
  price INTEGER NOT NULL,
  payment_type TEXT NOT NULL,
  order_type TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ
);
`

const dropOrderTableQuery = `
DROP TABLE IF EXISTS orders;
`

export class OrderInit implements Migration {

  constructor(private readonly pool: Pool) {}

  public up(): Promise<QueryResult> {
    console.log('OrderInit.up')
    return this.pool.query(createOrderTableQuery)
  }

  public down(): Promise<QueryResult> {
    console.log('OrderInit.down')
    return this.pool.query(dropOrderTableQuery)
  }

}

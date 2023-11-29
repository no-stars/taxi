import { Migration } from '@libs/common/interfaces'
import { Pool } from 'pg'


const createOrderIndexesQuery = `
CREATE INDEX IF NOT EXISTS idx_orders_start_location
ON orders
USING GIST (start_location);

CREATE INDEX IF NOT EXISTS idx_orders_ride_id ON orders (ride_id);

CREATE INDEX IF NOT EXISTS idx_orders_passenger_id ON orders (passenger_id)
WHERE ride_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_orders_price_segment_order_type ON orders (price_segment, order_type)
WHERE ride_id IS NULL;
`

const dropOrderIndexesQuery = `
DROP INDEX IF EXISTS idx_orders_start_location;
DROP INDEX IF EXISTS idx_orders_ride_id;
DROP INDEX IF EXISTS idx_orders_passenger_id;
DROP INDEX IF EXISTS idx_orders_price_segment_order_type;
`

export class OrderIndexes implements Migration {

  constructor(private readonly pool: Pool) {}

  public async up(): Promise<void> {
    console.log('OrderIndexes.up')
    await this.pool.query(createOrderIndexesQuery)
  }

  public async down(): Promise<void> {
    console.log('OrderIndexes.down')
    await this.pool.query(dropOrderIndexesQuery)
  }

}

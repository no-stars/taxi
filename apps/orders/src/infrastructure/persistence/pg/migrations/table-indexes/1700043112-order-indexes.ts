import MigrationInterface from '@infrastructure/persistence/pg/migrations/migration.interface'
import { Pool } from 'pg'


const createOrderIndexesQuery = `
CREATE INDEX idx_orders_start_location
  ON orders
  USING GIST (start_location);

CREATE INDEX idx_orders_ride_id ON price_proposes (ride_id);

CREATE INDEX idx_orders_passenger_id ON price_proposes (passenger_id)
WHERE ride_id IS NOT NULL;

CREATE INDEX idx_orders_price_segment_order_type ON price_proposes (price_segment, order_type)
WHERE ride_id IS NOT NULL;
`

const dropOrderIndexesQuery = `
DROP INDEX idx_orders_start_location;
DROP INDEX idx_orders_ride_id;
DROP INDEX idx_orders_passenger_id;
DROP INDEX idx_orders_price_segment_order_type;
`

export class OrderIndexes implements MigrationInterface {

  constructor(private readonly pool: Pool) {}

  public async up(): Promise<any> {
    console.log('OrderIndexes.up')
    return await this.pool.query(createOrderIndexesQuery)
  }

  public async down(): Promise<any> {
    console.log('OrderIndexes.down')
    return await this.pool.query(dropOrderIndexesQuery)
  }

}

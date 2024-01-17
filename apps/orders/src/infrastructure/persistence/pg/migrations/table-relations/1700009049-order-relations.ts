import { Migration } from '@libs/common/interfaces'
import { Pool, QueryResult } from 'pg'


const createOrderRelationsQuery = `
ALTER TABLE orders
    ADD CONSTRAINT orders_ride_id_fkey FOREIGN KEY (ride_id)
    REFERENCES rides (ride_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE;
`

const dropOrderRelationsQuery = `
ALTER TABLE orders DROP CONSTRAINT IF EXISTS orders_ride_id_fkey;
`

export class OrderRelations implements Migration {

  constructor(private readonly pool: Pool) {}

  public up(): Promise<QueryResult> {
    console.log('OrderRelations.up')
    return this.pool.query(createOrderRelationsQuery)
  }

  public down(): Promise<QueryResult> {
    console.log('OrderRelations.down')
    return this.pool.query(dropOrderRelationsQuery)
  }

}

import { Migration } from '@libs/common/interfaces'
import { Pool } from 'pg'


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

  public async up(): Promise<void> {
    console.log('OrderRelations.up')
    await this.pool.query(createOrderRelationsQuery)
  }

  public async down(): Promise<void> {
    console.log('OrderRelations.down')
    await this.pool.query(dropOrderRelationsQuery)
  }

}

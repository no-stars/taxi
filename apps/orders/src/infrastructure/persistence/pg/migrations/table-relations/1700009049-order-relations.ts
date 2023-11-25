import { Migration } from '@libs/common/interfaces'
import { Pool } from 'pg'


const createOrderRelationsQuery = `
ALTER TABLE orders
    ADD CONSTRAINT orders_ride_id_fkey FOREIGN KEY (ride_id)
    REFERENCES rides (ride_id);
`

const dropOrderRelationsQuery = `
ALTER TABLE orders DROP CONSTRAINT orders_ride_id_fkey;
`

export class OrderRelations implements Migration {

  constructor(private readonly pool: Pool) {}

  public async up(): Promise<any> {
    console.log('OrderRelations.up')
    return await this.pool.query(createOrderRelationsQuery)
  }

  public async down(): Promise<any> {
    console.log('OrderRelations.down')
    return await this.pool.query(dropOrderRelationsQuery)
  }

}

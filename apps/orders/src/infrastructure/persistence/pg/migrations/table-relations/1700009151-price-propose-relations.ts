import { Migration } from '@libs/common/interfaces'
import { Pool } from 'pg'


const createPriceProposeRelationsQuery = `
ALTER TABLE price_proposes
    ADD CONSTRAINT price_proposes_order_id_fkey FOREIGN KEY (order_id)
    REFERENCES orders (order_id);
`

const dropPriceProposeRelationsQuery = `
ALTER TABLE price_proposes DROP CONSTRAINT IF EXISTS price_proposes_order_id_fkey;
`

export class PriceProposeRelations implements Migration {

  constructor(private readonly pool: Pool) {}

  public async up(): Promise<any> {
    console.log('PriceProposeRelations.up')
    return await this.pool.query(createPriceProposeRelationsQuery)
  }

  public async down(): Promise<any> {
    console.log('PriceProposeRelations.down')
    return await this.pool.query(dropPriceProposeRelationsQuery)
  }

}

import { Migration } from '@libs/common/interfaces'
import { Pool } from 'pg'


const createPriceProposeRelationsQuery = `
ALTER TABLE price_proposes
    ADD CONSTRAINT price_proposes_order_id_fkey FOREIGN KEY (order_id)
    REFERENCES orders (order_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE;
`

const dropPriceProposeRelationsQuery = `
ALTER TABLE price_proposes DROP CONSTRAINT IF EXISTS price_proposes_order_id_fkey;
`

export class PriceProposeRelations implements Migration {

  constructor(private readonly pool: Pool) {}

  public async up(): Promise<void> {
    console.log('PriceProposeRelations.up')
    await this.pool.query(createPriceProposeRelationsQuery)
  }

  public async down(): Promise<void> {
    console.log('PriceProposeRelations.down')
    await this.pool.query(dropPriceProposeRelationsQuery)
  }

}

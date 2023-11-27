import { Migration } from '@libs/common/interfaces'
import { Pool } from 'pg'


const createPriceProposeIndexesQuery = `
CREATE INDEX IF NOT EXISTS idx_price_proposes_order_id_driver_id
ON price_proposes (order_id, driver_id);
`

const dropPriceProposeIndexesQuery = `
DROP INDEX IF EXISTS idx_price_proposes_order_id_driver_id;
`

export class PriceProposeIndexes implements Migration {

  constructor(private readonly pool: Pool) {}

  public async up(): Promise<any> {
    console.log('PriceProposeIndexes.up')
    return await this.pool.query(createPriceProposeIndexesQuery)
  }

  public async down(): Promise<any> {
    console.log('PriceProposeIndexes.down')
    return await this.pool.query(dropPriceProposeIndexesQuery)
  }

}

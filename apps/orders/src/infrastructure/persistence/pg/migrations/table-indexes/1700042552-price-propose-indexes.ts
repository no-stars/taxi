import { Migration } from '@libs/common/interfaces'
import { Pool, QueryResult } from 'pg'


const createPriceProposeIndexesQuery = `
CREATE INDEX IF NOT EXISTS idx_price_proposes_order_id_driver_id
ON price_proposes (order_id, driver_id);
`

const dropPriceProposeIndexesQuery = `
DROP INDEX IF EXISTS idx_price_proposes_order_id_driver_id;
`

export class PriceProposeIndexes implements Migration {

  constructor(private readonly pool: Pool) {}

  public up(): Promise<QueryResult> {
    console.log('PriceProposeIndexes.up')
    return this.pool.query(createPriceProposeIndexesQuery)
  }

  public down(): Promise<QueryResult> {
    console.log('PriceProposeIndexes.down')
    return this.pool.query(dropPriceProposeIndexesQuery)
  }

}

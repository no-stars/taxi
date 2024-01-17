import { Migration } from '@libs/common/interfaces'
import { Pool, QueryResult } from 'pg'


const createPriceProposeTableQuery = `
CREATE TABLE IF NOT EXISTS price_proposes (
  price_propose_id UUID PRIMARY KEY,
  order_id UUID NOT NULL,
  driver_id UUID NOT NULL,
  propose_type TEXT NOT NULL,
  proposed_price INTEGER NOT NULL,
  result TEXT,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ
);
`

const dropPriceProposeTableQuery = `
DROP TABLE IF EXISTS price_proposes;
`

export class PriceProposeInit implements Migration {

  constructor(private readonly pool: Pool) {}

  public up(): Promise<QueryResult> {
    console.log('PriceProposeInit.up')
    return this.pool.query(createPriceProposeTableQuery)
  }

  public down(): Promise<QueryResult> {
    console.log('PriceProposeInit.down')
    return this.pool.query(dropPriceProposeTableQuery)
  }

}

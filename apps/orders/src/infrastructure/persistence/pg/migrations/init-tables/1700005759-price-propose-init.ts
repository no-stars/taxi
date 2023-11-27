import { Migration } from '@libs/common/interfaces'
import { Pool } from 'pg'


const createPriceProposeTableQuery = `
CREATE TABLE IF NOT EXISTS price_proposes (
  price_propose_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL,
  driver_id UUID NOT NULL,
  propose_type TEXT NOT NULL,
  proposed_price INTEGER NOT NULL,
  result TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ
);
`

const dropPriceProposeTableQuery = `
DROP TABLE IF EXISTS price_proposes;
`

export class PriceProposeInit implements Migration {

  constructor(private readonly pool: Pool) {}

  public async up(): Promise<any> {
    console.log('PriceProposeInit.up')
    return await this.pool.query(createPriceProposeTableQuery)
  }

  public async down(): Promise<any> {
    console.log('PriceProposeInit.down')
    return await this.pool.query(dropPriceProposeTableQuery)
  }

}

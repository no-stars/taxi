import MigrationInterface from '@infrastructure/persistent/pg/migrations/migration.interface'
import { Pool } from 'pg'


const createPriceProposeIndexesQuery = `
CREATE INDEX idx_price_proposes_order_id ON price_proposes (order_id);
`

const dropPriceProposeIndexesQuery = `
DROP INDEX idx_price_proposes_order_id;
`

export class PriceProposeIndexes implements MigrationInterface {

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

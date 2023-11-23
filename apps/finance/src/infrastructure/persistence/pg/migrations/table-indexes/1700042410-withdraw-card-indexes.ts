import MigrationInterface from '@infrastructure/persistence/pg/migrations/migration.interface'
import { Pool } from 'pg'


const createWithdrawCardIndexesQuery = `
CREATE INDEX idx_withdraw_cards_account_id ON withdraw_cards (account_id);
`

const dropWithdrawCardIndexesQuery = `
DROP INDEX idx_withdraw_cards_account_id;
`

export class WithdrawCardIndexes implements MigrationInterface {

  constructor(private readonly pool: Pool) {}

  public async up(): Promise<any> {
    console.log('WithdrawCardIndexes.up')
    return await this.pool.query(createWithdrawCardIndexesQuery)
  }

  public async down(): Promise<any> {
    console.log('WithdrawCardIndexes.down')
    return await this.pool.query(dropWithdrawCardIndexesQuery)
  }

}

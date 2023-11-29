import { Migration } from '@libs/common/interfaces'
import { Pool } from 'pg'


const createWithdrawCardIndexesQuery = `
CREATE INDEX IF NOT EXISTS idx_withdraw_cards_account_id ON withdraw_cards (account_id);
`

const dropWithdrawCardIndexesQuery = `
DROP INDEX IF EXISTS idx_withdraw_cards_account_id;
`

export class WithdrawCardIndexes implements Migration {

  constructor(private readonly pool: Pool) {}

  public async up(): Promise<void> {
    console.log('WithdrawCardIndexes.up')
    await this.pool.query(createWithdrawCardIndexesQuery)
  }

  public async down(): Promise<void> {
    console.log('WithdrawCardIndexes.down')
    await this.pool.query(dropWithdrawCardIndexesQuery)
  }

}

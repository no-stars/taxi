import { Migration } from '@libs/common/interfaces'
import { Pool, QueryResult } from 'pg'


const createWithdrawCardIndexesQuery = `
CREATE INDEX IF NOT EXISTS idx_withdraw_cards_account_id ON withdraw_cards (account_id);
`

const dropWithdrawCardIndexesQuery = `
DROP INDEX IF EXISTS idx_withdraw_cards_account_id;
`

export class WithdrawCardIndexes implements Migration {

  constructor(private readonly pool: Pool) {}

  public up(): Promise<QueryResult> {
    console.log('WithdrawCardIndexes.up')
    return this.pool.query(createWithdrawCardIndexesQuery)
  }

  public down(): Promise<QueryResult> {
    console.log('WithdrawCardIndexes.down')
    return this.pool.query(dropWithdrawCardIndexesQuery)
  }

}

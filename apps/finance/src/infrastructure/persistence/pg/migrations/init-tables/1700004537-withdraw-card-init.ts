import { Migration } from '@libs/common/interfaces'
import { Pool, QueryResult } from 'pg'


const createWithdrawCardTableQuery = `
CREATE TABLE IF NOT EXISTS withdraw_cards (
  withdraw_card_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id UUID NOT NULL,
  card_type TEXT NOT NULL,
  card_number TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ
);
`

const dropWithdrawCardTableQuery = `
DROP TABLE IF EXISTS withdraw_cards;
`

export class WithdrawCardInit implements Migration {

  constructor(private readonly pool: Pool) {}

  public up(): Promise<QueryResult> {
    console.log('WithdrawCardInit.up')
    return this.pool.query(createWithdrawCardTableQuery)
  }

  public down(): Promise<QueryResult> {
    console.log('WithdrawCardInit.down')
    return this.pool.query(dropWithdrawCardTableQuery)
  }

}

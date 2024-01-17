import { Migration } from '@libs/common/interfaces'
import { Pool, QueryResult } from 'pg'


const createPaymentCardIndexesQuery = `
CREATE INDEX IF NOT EXISTS idx_payment_cards_account_id ON payment_cards (account_id);
`

const dropPaymentCardIndexesQuery = `
DROP INDEX IF EXISTS idx_payment_cards_account_id;
`

export class PaymentCardIndexes implements Migration {

  constructor(private readonly pool: Pool) {}

  public up(): Promise<QueryResult> {
    console.log('PaymentCardIndexes.up')
    return this.pool.query(createPaymentCardIndexesQuery)
  }

  public down(): Promise<QueryResult> {
    console.log('PaymentCardIndexes.down')
    return this.pool.query(dropPaymentCardIndexesQuery)
  }

}

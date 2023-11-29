import { Migration } from '@libs/common/interfaces'
import { Pool } from 'pg'


const createPaymentCardIndexesQuery = `
CREATE INDEX IF NOT EXISTS idx_payment_cards_account_id ON payment_cards (account_id);
`

const dropPaymentCardIndexesQuery = `
DROP INDEX IF EXISTS idx_payment_cards_account_id;
`

export class PaymentCardIndexes implements Migration {

  constructor(private readonly pool: Pool) {}

  public async up(): Promise<void> {
    console.log('PaymentCardIndexes.up')
    await this.pool.query(createPaymentCardIndexesQuery)
  }

  public async down(): Promise<void> {
    console.log('PaymentCardIndexes.down')
    await this.pool.query(dropPaymentCardIndexesQuery)
  }

}

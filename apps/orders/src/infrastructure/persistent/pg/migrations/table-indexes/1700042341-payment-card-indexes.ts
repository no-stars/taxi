import MigrationInterface from '@infrastructure/persistent/pg/migrations/migration.interface'
import { Pool } from 'pg'


const createPaymentCardIndexesQuery = `
CREATE INDEX idx_payment_cards_account_id ON payment_cards (account_id);
`

const dropPaymentCardIndexesQuery = `
DROP INDEX idx_payment_cards_account_id;
`

export class PaymentCardIndexes implements MigrationInterface {

  constructor(private readonly pool: Pool) {}

  public async up(): Promise<any> {
    console.log('PaymentCardIndexes.up')
    return await this.pool.query(createPaymentCardIndexesQuery)
  }

  public async down(): Promise<any> {
    console.log('PaymentCardIndexes.down')
    return await this.pool.query(dropPaymentCardIndexesQuery)
  }

}

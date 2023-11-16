import MigrationInterface from '@infrastructure/persistent/pg/migrations/migration.interface'
import { Pool } from 'pg'


const createPaymentCardTableQuery = `
CREATE TABLE IF NOT EXISTS payment_cards (
  payment_card_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id UUID NOT NULL,
  card_type TEXT NOT NULL,
  expire_at DATE NOT NULL,
  card_number TEXT NOT NULL,
  cvv TEXT NOT NULL,
  holder_name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ
);
`

const dropPaymentCardTableQuery = `
DROP TABLE payment_cards;
`

export class PaymentCardInit implements MigrationInterface {

  constructor(private readonly pool: Pool) {}

  public async up(): Promise<any> {
    console.log('PaymentCardInit.up')
    return await this.pool.query(createPaymentCardTableQuery)
  }

  public async down(): Promise<any> {
    console.log('PaymentCardInit.down')
    return await this.pool.query(dropPaymentCardTableQuery)
  }

}

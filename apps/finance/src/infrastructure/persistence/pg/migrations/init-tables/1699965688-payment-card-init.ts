import { Migration } from '@libs/common/interfaces'
import { Pool, QueryResult } from 'pg'


const createPaymentCardTableQuery = `
CREATE TABLE IF NOT EXISTS payment_cards (
  payment_card_id UUID PRIMARY KEY,
  account_id UUID NOT NULL,
  card_type TEXT NOT NULL,
  expire_at DATE NOT NULL,
  card_number TEXT NOT NULL,
  cvv TEXT NOT NULL,
  holder_name TEXT NOT NULL,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ
);
`

const dropPaymentCardTableQuery = `
DROP TABLE IF EXISTS payment_cards;
`

export class PaymentCardInit implements Migration {

  constructor(private readonly pool: Pool) {}

  public up(): Promise<QueryResult> {
    console.log('PaymentCardInit.up')
    return this.pool.query(createPaymentCardTableQuery)
  }

  public down(): Promise<QueryResult> {
    console.log('PaymentCardInit.down')
    return this.pool.query(dropPaymentCardTableQuery)
  }

}

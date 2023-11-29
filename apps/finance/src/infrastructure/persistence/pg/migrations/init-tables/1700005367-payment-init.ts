import { Migration } from '@libs/common/interfaces'
import { Pool } from 'pg'


const createPaymentTableQuery = `
CREATE TABLE IF NOT EXISTS payments (
  payment_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  price INTEGER NOT NULL,
  payment_type TEXT NOT NULL,
  receipt_url TEXT UNIQUE,
  status TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ
);
`

const dropPaymentTableQuery = `
DROP TABLE IF EXISTS payments;
`

export class PaymentInit implements Migration {

  constructor(private readonly pool: Pool) {}

  public async up(): Promise<void> {
    console.log('PaymentInit.up')
    await this.pool.query(createPaymentTableQuery)
  }

  public async down(): Promise<void> {
    console.log('PaymentInit.down')
    await this.pool.query(dropPaymentTableQuery)
  }

}

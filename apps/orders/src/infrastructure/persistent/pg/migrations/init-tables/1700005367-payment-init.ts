import MigrationInterface from '@infrastructure/persistent/pg/migrations/migration.interface'
import { Pool } from 'pg'


const createPaymentTableQuery = `
CREATE TABLE IF NOT EXISTS payments (
  payment_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  price INTEGER NOT NULL,
  payment_type TEXT NOT NULL,
  receipt_url TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ
);
`

const dropPaymentTableQuery = `
DROP TABLE payments;
`

export class PaymentInit implements MigrationInterface {

  constructor(private readonly pool: Pool) {}

  public async up(): Promise<any> {
    console.log('PaymentInit.up')
    return await this.pool.query(createPaymentTableQuery)
  }

  public async down(): Promise<any> {
    console.log('PaymentInit.down')
    return await this.pool.query(dropPaymentTableQuery)
  }

}

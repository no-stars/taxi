import MigrationInterface from '@infrastructure/persistent/pg/migrations/migration.interface'
import { Pool } from 'pg'


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
DROP TABLE withdraw_cards;
`

export class WithdrawCardInit implements MigrationInterface {

  constructor(private readonly pool: Pool) {}

  public async up(): Promise<any> {
    console.log('WithdrawCardInit.up')
    return await this.pool.query(createWithdrawCardTableQuery)
  }

  public async down(): Promise<any> {
    console.log('WithdrawCardInit.down')
    return await this.pool.query(dropWithdrawCardTableQuery)
  }

}

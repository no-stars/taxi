import MigrationInterface from '@infrastructure/persistence/pg/migrations/migration.interface'
import { Pool } from 'pg'


const createAccountModelTableQuery = `
CREATE TABLE IF NOT EXISTS accounts (
  account_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone_number TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ
);
`

const dropAccountModelTableQuery = `
DROP TABLE accounts;
`

export class AccountInit implements MigrationInterface {

  constructor(private readonly pool: Pool) {}

  public async up(): Promise<any> {
    console.log('AccountInit.up')
    return await this.pool.query(createAccountModelTableQuery)
  }

  public async down(): Promise<any> {
    console.log('AccountInit.down')
    return await this.pool.query(dropAccountModelTableQuery)
  }

}

import { Migration } from '@libs/common/interfaces'
import { Pool } from 'pg'


const createAccountModelTableQuery = `
CREATE TABLE IF NOT EXISTS accounts (
  account_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone_number TEXT NOT NULL UNIQUE,
  email TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ
);
`

const dropAccountModelTableQuery = `
DROP TABLE IF EXISTS accounts;
`

export class AccountInit implements Migration {

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

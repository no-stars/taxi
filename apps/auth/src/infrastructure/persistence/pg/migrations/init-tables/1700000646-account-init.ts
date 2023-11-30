import { Migration } from '@libs/common/interfaces'
import { Pool, QueryResult } from 'pg'


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

  public up(): Promise<QueryResult> {
    console.log('AccountInit.up')
    return this.pool.query(createAccountModelTableQuery)
  }

  public down(): Promise<QueryResult> {
    console.log('AccountInit.down')
    return this.pool.query(dropAccountModelTableQuery)
  }

}

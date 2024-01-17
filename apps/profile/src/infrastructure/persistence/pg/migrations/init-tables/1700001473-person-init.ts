import { Migration } from '@libs/common/interfaces'
import { Pool, QueryResult } from 'pg'


const createPersonTableQuery = `
CREATE TABLE IF NOT EXISTS persons (
  person_id UUID PRIMARY KEY,
  account_id UUID NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT,
  middle_name TEXT,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ
);
`

const dropPersonTableQuery = `
DROP TABLE IF EXISTS persons;
`

export class PersonInit implements Migration {

  constructor(private readonly pool: Pool) {}

  public up(): Promise<QueryResult> {
    console.log('PersonInit.up')
    return this.pool.query(createPersonTableQuery)
  }

  public down(): Promise<QueryResult> {
    console.log('PersonInit.down')
    return this.pool.query(dropPersonTableQuery)
  }

}

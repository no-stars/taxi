import { Migration } from '@libs/common/interfaces'
import { Pool, QueryResult } from 'pg'


const createPersonIndexesQuery = `
CREATE INDEX IF NOT EXISTS idx_persons_account_id ON persons (account_id);
`

const dropPersonIndexesQuery = `
DROP INDEX IF EXISTS idx_persons_account_id;
`

export class PersonIndexes implements Migration {

  constructor(private readonly pool: Pool) {}

  public up(): Promise<QueryResult> {
    console.log('PersonIndexes.up')
    return this.pool.query(createPersonIndexesQuery)
  }

  public down(): Promise<QueryResult> {
    console.log('PersonIndexes.down')
    return this.pool.query(dropPersonIndexesQuery)
  }

}

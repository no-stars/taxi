import { Migration } from '@libs/common/interfaces'
import { Pool } from 'pg'


const createPersonIndexesQuery = `
CREATE INDEX IF NOT EXISTS idx_persons_account_id ON persons (account_id);
`

const dropPersonIndexesQuery = `
DROP INDEX IF EXISTS idx_persons_account_id;
`

export class PersonIndexes implements Migration {

  constructor(private readonly pool: Pool) {}

  public async up(): Promise<any> {
    console.log('PersonIndexes.up')
    return await this.pool.query(createPersonIndexesQuery)
  }

  public async down(): Promise<any> {
    console.log('PersonIndexes.down')
    return await this.pool.query(dropPersonIndexesQuery)
  }

}

import MigrationInterface from '@infrastructure/persistent/pg/migrations/migration.interface'
import { Pool } from 'pg'


const createPersonIndexesQuery = `
CREATE INDEX idx_persons_account_id ON persons (account_id);
`

const dropPersonIndexesQuery = `
DROP INDEX idx_persons_account_id;
`

export class PersonIndexes implements MigrationInterface {

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

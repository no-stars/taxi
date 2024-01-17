import { Migration } from '@libs/common/interfaces'
import { Pool, QueryResult } from 'pg'


const createDriverIndexesQuery = `
CREATE INDEX IF NOT EXISTS idx_drivers_person_id ON drivers (person_id);
`

const dropDriverIndexesQuery = `
DROP INDEX IF EXISTS idx_drivers_person_id;
`

export class DriverIndexes implements Migration {

  constructor(private readonly pool: Pool) {}

  public up(): Promise<QueryResult> {
    console.log('DriverIndexes.up')
    return this.pool.query(createDriverIndexesQuery)
  }

  public down(): Promise<QueryResult> {
    console.log('DriverIndexes.down')
    return this.pool.query(dropDriverIndexesQuery)
  }

}

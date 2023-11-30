import { Migration } from '@libs/common/interfaces'
import { Pool, QueryResult } from 'pg'


const createPassengerIndexesQuery = `
CREATE INDEX IF NOT EXISTS idx_passengers_person_id ON passengers (person_id);
`

const dropPassengerIndexesQuery = `
DROP INDEX IF EXISTS idx_passengers_person_id;
`

export class PassengerIndexes implements Migration {

  constructor(private readonly pool: Pool) {}

  public up(): Promise<QueryResult> {
    console.log('PassengerIndexes.up')
    return this.pool.query(createPassengerIndexesQuery)
  }

  public down(): Promise<QueryResult> {
    console.log('PassengerIndexes.down')
    return this.pool.query(dropPassengerIndexesQuery)
  }

}

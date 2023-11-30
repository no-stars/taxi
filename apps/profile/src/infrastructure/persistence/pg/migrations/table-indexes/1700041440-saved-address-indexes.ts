import { Migration } from '@libs/common/interfaces'
import { Pool, QueryResult } from 'pg'


const createSavedAddressIndexesQuery = `
CREATE INDEX IF NOT EXISTS idx_saved_addresses_passenger_id ON saved_addresses (passenger_id);
`

const dropSavedAddressIndexesQuery = `
DROP INDEX IF EXISTS idx_saved_addresses_passenger_id;
`

export class SavedAddressIndexes implements Migration {

  constructor(private readonly pool: Pool) {}

  public up(): Promise<QueryResult> {
    console.log('SavedAddressIndexes.up')
    return this.pool.query(createSavedAddressIndexesQuery)
  }

  public down(): Promise<QueryResult> {
    console.log('SavedAddressIndexes.down')
    return this.pool.query(dropSavedAddressIndexesQuery)
  }

}

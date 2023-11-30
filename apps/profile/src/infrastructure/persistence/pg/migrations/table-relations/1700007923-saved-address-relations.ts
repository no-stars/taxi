import { Migration } from '@libs/common/interfaces'
import { Pool, QueryResult } from 'pg'


const createSavedAddressRelationsQuery = `
ALTER TABLE saved_addresses
    ADD CONSTRAINT saved_addresses_passenger_id_fkey FOREIGN KEY (passenger_id)
    REFERENCES passengers (passenger_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE;
`

const dropSavedAddressRelationsQuery = `
ALTER TABLE saved_addresses DROP CONSTRAINT IF EXISTS saved_addresses_passenger_id_fkey;
`

export class SavedAddressRelations implements Migration {

  constructor(private readonly pool: Pool) {}

  public up(): Promise<QueryResult> {
    console.log('SavedAddressRelations.up')
    return this.pool.query(createSavedAddressRelationsQuery)
  }

  public down(): Promise<QueryResult> {
    console.log('SavedAddressRelations.down')
    return this.pool.query(dropSavedAddressRelationsQuery)
  }

}

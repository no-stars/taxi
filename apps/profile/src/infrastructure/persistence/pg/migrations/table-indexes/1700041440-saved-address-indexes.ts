import { Migration } from '@libs/common/interfaces'
import { Pool } from 'pg'


const createSavedAddressIndexesQuery = `
CREATE INDEX IF NOT EXISTS idx_saved_addresses_passenger_id ON saved_addresses (passenger_id);
`

const dropSavedAddressIndexesQuery = `
DROP INDEX IF EXISTS idx_saved_addresses_passenger_id;
`

export class SavedAddressIndexes implements Migration {

  constructor(private readonly pool: Pool) {}

  public async up(): Promise<void> {
    console.log('SavedAddressIndexes.up')
    await this.pool.query(createSavedAddressIndexesQuery)
  }

  public async down(): Promise<void> {
    console.log('SavedAddressIndexes.down')
    await this.pool.query(dropSavedAddressIndexesQuery)
  }

}

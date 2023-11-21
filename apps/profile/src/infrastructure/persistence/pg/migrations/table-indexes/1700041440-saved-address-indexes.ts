import MigrationInterface from '@infrastructure/persistence/pg/migrations/migration.interface'
import { Pool } from 'pg'


const createSavedAddressIndexesQuery = `
CREATE INDEX idx_saved_addresses_passenger_id ON saved_addresses (passenger_id);
`

const dropSavedAddressIndexesQuery = `
DROP INDEX idx_saved_addresses_passenger_id;
`

export class SavedAddressIndexes implements MigrationInterface {

  constructor(private readonly pool: Pool) {}

  public async up(): Promise<any> {
    console.log('SavedAddressIndexes.up')
    return await this.pool.query(createSavedAddressIndexesQuery)
  }

  public async down(): Promise<any> {
    console.log('SavedAddressIndexes.down')
    return await this.pool.query(dropSavedAddressIndexesQuery)
  }

}

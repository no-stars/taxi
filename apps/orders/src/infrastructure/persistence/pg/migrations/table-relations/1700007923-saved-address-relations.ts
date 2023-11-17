import MigrationInterface from '@infrastructure/persistence/pg/migrations/migration.interface'
import { Pool } from 'pg'


const createSavedAddressRelationsQuery = `
ALTER TABLE saved_addresses
    ADD CONSTRAINT saved_addresses_passenger_id_fkey FOREIGN KEY (passenger_id)
    REFERENCES passengers (passenger_id);
`

const dropSavedAddressRelationsQuery = `
ALTER TABLE saved_addresses DROP CONSTRAINT saved_addresses_passenger_id_fkey;
`

export class SavedAddressRelations implements MigrationInterface {

  constructor(private readonly pool: Pool) {}

  public async up(): Promise<any> {
    console.log('SavedAddressRelations.up')
    return await this.pool.query(createSavedAddressRelationsQuery)
  }

  public async down(): Promise<any> {
    console.log('SavedAddressRelations.down')
    return await this.pool.query(dropSavedAddressRelationsQuery)
  }

}

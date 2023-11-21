import MigrationInterface from '@infrastructure/persistence/pg/migrations/migration.interface'
import { Pool } from 'pg'


const createSavedAddressModelTableQuery = `
CREATE TABLE IF NOT EXISTS saved_addresses (
  account_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  address_name TEXT NOT NULL,
  passenger_id UUID NOT NULL,
  coordinates POINT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ
);
`

const dropSavedAddressModelTableQuery = `
DROP TABLE saved_addresses;
`

export class SavedAddressInit implements MigrationInterface {

  constructor(private readonly pool: Pool) {}

  public async up(): Promise<any> {
    console.log('SavedAddressInit.up')
    return await this.pool.query(createSavedAddressModelTableQuery)
  }

  public async down(): Promise<any> {
    console.log('SavedAddressInit.down')
    return await this.pool.query(dropSavedAddressModelTableQuery)
  }

}

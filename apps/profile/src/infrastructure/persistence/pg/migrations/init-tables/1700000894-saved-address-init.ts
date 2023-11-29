import { Migration } from '@libs/common/interfaces'
import { Pool } from 'pg'


const createSavedAddressModelTableQuery = `
CREATE TABLE IF NOT EXISTS saved_addresses (
  saved_address_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  address_name TEXT NOT NULL,
  passenger_id UUID NOT NULL,
  coordinates POINT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ
);
`

const dropSavedAddressModelTableQuery = `
DROP TABLE IF EXISTS saved_addresses;
`

export class SavedAddressInit implements Migration {

  constructor(private readonly pool: Pool) {}

  public async up(): Promise<void> {
    console.log('SavedAddressInit.up')
    await this.pool.query(createSavedAddressModelTableQuery)
  }

  public async down(): Promise<void> {
    console.log('SavedAddressInit.down')
    await this.pool.query(dropSavedAddressModelTableQuery)
  }

}

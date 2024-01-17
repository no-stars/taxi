import { Migration } from '@libs/common/interfaces'
import { Pool, QueryResult } from 'pg'


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

  public up(): Promise<QueryResult> {
    console.log('SavedAddressInit.up')
    return this.pool.query(createSavedAddressModelTableQuery)
  }

  public down(): Promise<QueryResult> {
    console.log('SavedAddressInit.down')
    return this.pool.query(dropSavedAddressModelTableQuery)
  }

}

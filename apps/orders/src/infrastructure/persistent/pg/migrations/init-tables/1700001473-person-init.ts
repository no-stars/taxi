import MigrationInterface from '@infrastructure/persistent/pg/migrations/migration.interface'
import { Pool } from 'pg'


const createPersonTableQuery = `
CREATE TABLE IF NOT EXISTS persons (
  person_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id UUID,
  first_name TEXT NOT NULL,
  last_name TEXT,
  middle_name TEXT,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz,
  deleted_at timestamptz
);
`

const dropPersonTableQuery = `
DROP TABLE persons;
`

export class PersonInit implements MigrationInterface {

  constructor(private readonly pool: Pool) {}

  public async up(): Promise<any> {
    console.log('PersonInit.up')
    return await this.pool.query(createPersonTableQuery)
  }

  public async down(): Promise<any> {
    console.log('PersonInit.down')
    return await this.pool.query(dropPersonTableQuery)
  }

}

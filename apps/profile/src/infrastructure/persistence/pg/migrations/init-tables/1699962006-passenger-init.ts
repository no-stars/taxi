import MigrationInterface from '@infrastructure/persistence/pg/migrations/migration.interface'
import { Pool } from 'pg'


const createPassengerTableQuery = `
CREATE TABLE IF NOT EXISTS passengers (
  passenger_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  person_id UUID NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ
);
`

const dropPassengerTableQuery = `
DROP TABLE passengers;
`

export class PassengerInit implements MigrationInterface {

  constructor(private readonly pool: Pool) {}

  public async up(): Promise<any> {
    console.log('PassengerInit.up')
    return await this.pool.query(createPassengerTableQuery)
  }

  public async down(): Promise<any> {
    console.log('PassengerInit.down')
    return await this.pool.query(dropPassengerTableQuery)
  }

}

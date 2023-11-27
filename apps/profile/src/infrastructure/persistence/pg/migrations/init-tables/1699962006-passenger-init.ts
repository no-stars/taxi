import { Migration } from '@libs/common/interfaces'
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
DROP TABLE IF EXISTS passengers;
`

export class PassengerInit implements Migration {

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

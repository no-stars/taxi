import { Migration } from '@libs/common/interfaces'
import { Pool } from 'pg'


const createPassengerIndexesQuery = `
CREATE INDEX IF NOT EXISTS idx_passengers_person_id ON passengers (person_id);
`

const dropPassengerIndexesQuery = `
DROP INDEX IF EXISTS idx_passengers_person_id;
`

export class PassengerIndexes implements Migration {

  constructor(private readonly pool: Pool) {}

  public async up(): Promise<void> {
    console.log('PassengerIndexes.up')
    await this.pool.query(createPassengerIndexesQuery)
  }

  public async down(): Promise<void> {
    console.log('PassengerIndexes.down')
    await this.pool.query(dropPassengerIndexesQuery)
  }

}

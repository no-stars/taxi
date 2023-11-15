import MigrationInterface from '@infrastructure/persistent/pg/migrations/migration.interface'
import { Pool } from 'pg'


const createPassengerIndexesQuery = `
CREATE INDEX idx_passenger_person_id ON passengers (person_id);
`

const dropPassengerIndexesQuery = `
DROP INDEX idx_passenger_person_id;
`

export class PassengerIndexes implements MigrationInterface {

  constructor(private readonly pool: Pool) {}

  public async up(): Promise<any> {
    console.log('PassengerIndexes.up')
    return await this.pool.query(createPassengerIndexesQuery)
  }

  public async down(): Promise<any> {
    console.log('PassengerIndexes.down')
    return await this.pool.query(dropPassengerIndexesQuery)
  }

}

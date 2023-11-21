import MigrationInterface from '@infrastructure/persistence/pg/migrations/migration.interface'
import { Pool } from 'pg'


const createPassengerRelationsQuery = `
ALTER TABLE passengers
    ADD CONSTRAINT passengers_person_id_fkey FOREIGN KEY (person_id)
    REFERENCES persons (person_id);
`

const dropPassengerRelationsQuery = `
ALTER TABLE passengers DROP CONSTRAINT passengers_person_id_fkey;
`

export class PassengerRelations implements MigrationInterface {

  constructor(private readonly pool: Pool) {}

  public async up(): Promise<any> {
    console.log('PassengerRelations.up')
    return await this.pool.query(createPassengerRelationsQuery)
  }

  public async down(): Promise<any> {
    console.log('PassengerRelations.down')
    return await this.pool.query(dropPassengerRelationsQuery)
  }

}

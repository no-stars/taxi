import { Migration } from '@libs/common/interfaces'
import { Pool } from 'pg'


const createPassengerRelationsQuery = `
ALTER TABLE passengers
    ADD CONSTRAINT passengers_person_id_fkey FOREIGN KEY (person_id)
    REFERENCES persons (person_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE;
`

const dropPassengerRelationsQuery = `
ALTER TABLE passengers DROP CONSTRAINT IF EXISTS passengers_person_id_fkey;
`

export class PassengerRelations implements Migration {

  constructor(private readonly pool: Pool) {}

  public async up(): Promise<void> {
    console.log('PassengerRelations.up')
    await this.pool.query(createPassengerRelationsQuery)
  }

  public async down(): Promise<void> {
    console.log('PassengerRelations.down')
    await this.pool.query(dropPassengerRelationsQuery)
  }

}

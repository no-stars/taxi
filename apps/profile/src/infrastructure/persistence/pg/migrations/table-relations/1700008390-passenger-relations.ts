import { Migration } from '@libs/common/interfaces'
import { Pool, QueryResult } from 'pg'


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

  public up(): Promise<QueryResult> {
    console.log('PassengerRelations.up')
    return this.pool.query(createPassengerRelationsQuery)
  }

  public down(): Promise<QueryResult> {
    console.log('PassengerRelations.down')
    return this.pool.query(dropPassengerRelationsQuery)
  }

}

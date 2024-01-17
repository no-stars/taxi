import { Migration } from '@libs/common/interfaces'
import { Pool, QueryResult } from 'pg'


const createDriverRelationsQuery = `
ALTER TABLE drivers
    ADD CONSTRAINT drivers_person_id_fkey FOREIGN KEY (person_id)
    REFERENCES persons (person_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE;
`

const dropDriverRelationsQuery = `
ALTER TABLE drivers DROP CONSTRAINT IF EXISTS drivers_person_id_fkey;
`

export class DriverRelations implements Migration {

  constructor(private readonly pool: Pool) {}

  public up(): Promise<QueryResult> {
    console.log('DriverRelations.up')
    return this.pool.query(createDriverRelationsQuery)
  }

  public down(): Promise<QueryResult> {
    console.log('DriverRelations.down')
    return this.pool.query(dropDriverRelationsQuery)
  }

}

import { Migration } from '@libs/common/interfaces'
import { Pool } from 'pg'


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

  public async up(): Promise<void> {
    console.log('DriverRelations.up')
    await this.pool.query(createDriverRelationsQuery)
  }

  public async down(): Promise<void> {
    console.log('DriverRelations.down')
    await this.pool.query(dropDriverRelationsQuery)
  }

}

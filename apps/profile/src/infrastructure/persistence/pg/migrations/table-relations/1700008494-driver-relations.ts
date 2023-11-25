import { Migration } from '@libs/common/interfaces'
import { Pool } from 'pg'


const createDriverRelationsQuery = `
ALTER TABLE drivers
    ADD CONSTRAINT drivers_person_id_fkey FOREIGN KEY (person_id)
    REFERENCES persons (person_id);
`

const dropDriverRelationsQuery = `
ALTER TABLE drivers DROP CONSTRAINT drivers_person_id_fkey;
`

export class DriverRelations implements Migration {

  constructor(private readonly pool: Pool) {}

  public async up(): Promise<any> {
    console.log('DriverRelations.up')
    return await this.pool.query(createDriverRelationsQuery)
  }

  public async down(): Promise<any> {
    console.log('DriverRelations.down')
    return await this.pool.query(dropDriverRelationsQuery)
  }

}

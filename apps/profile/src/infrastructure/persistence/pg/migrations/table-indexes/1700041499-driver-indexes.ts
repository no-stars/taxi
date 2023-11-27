import { Migration } from '@libs/common/interfaces'
import { Pool } from 'pg'


const createDriverIndexesQuery = `
CREATE INDEX IF NOT EXISTS idx_drivers_person_id ON drivers (person_id);
`

const dropDriverIndexesQuery = `
DROP INDEX IF EXISTS idx_drivers_person_id;
`

export class DriverIndexes implements Migration {

  constructor(private readonly pool: Pool) {}

  public async up(): Promise<any> {
    console.log('DriverIndexes.up')
    return await this.pool.query(createDriverIndexesQuery)
  }

  public async down(): Promise<any> {
    console.log('DriverIndexes.down')
    return await this.pool.query(dropDriverIndexesQuery)
  }

}

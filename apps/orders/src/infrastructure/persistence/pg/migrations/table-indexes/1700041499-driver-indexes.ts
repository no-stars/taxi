import MigrationInterface from '@infrastructure/persistence/pg/migrations/migration.interface'
import { Pool } from 'pg'


const createDriverIndexesQuery = `
CREATE INDEX idx_driver_person_id ON drivers (person_id);
`

const dropDriverIndexesQuery = `
DROP INDEX idx_driver_person_id;
`

export class DriverIndexes implements MigrationInterface {

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

import MigrationInterface from '@infrastructure/persistence/pg/migrations/migration.interface'
import { Pool } from 'pg'


const createShiftIndexesQuery = `
CREATE INDEX idx_shifts_driver_id ON shifts (driver_id);
`

const dropShiftIndexesQuery = `
DROP INDEX idx_shifts_driver_id;
`

export class ShiftIndexes implements MigrationInterface {

  constructor(private readonly pool: Pool) {}

  public async up(): Promise<any> {
    console.log('ShiftIndexes.up')
    return await this.pool.query(createShiftIndexesQuery)
  }

  public async down(): Promise<any> {
    console.log('ShiftIndexes.down')
    return await this.pool.query(dropShiftIndexesQuery)
  }

}

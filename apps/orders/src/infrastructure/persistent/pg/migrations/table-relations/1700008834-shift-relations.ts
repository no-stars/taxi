import MigrationInterface from '@infrastructure/persistent/pg/migrations/migration.interface'
import { Pool } from 'pg'


const createShiftRelationsQuery = `
ALTER TABLE shifts
    ADD CONSTRAINT shifts_shift_type_id_fkey FOREIGN KEY (shift_type_id)
    REFERENCES shift_types (shift_type_id);
`

const dropShiftRelationsQuery = `
ALTER TABLE shifts DROP CONSTRAINT shifts_shift_type_id_fkey;
`

export class ShiftRelations implements MigrationInterface {

  constructor(private readonly pool: Pool) {}

  public async up(): Promise<any> {
    console.log('ShiftRelations.up')
    return await this.pool.query(createShiftRelationsQuery)
  }

  public async down(): Promise<any> {
    console.log('ShiftRelations.down')
    return await this.pool.query(dropShiftRelationsQuery)
  }

}

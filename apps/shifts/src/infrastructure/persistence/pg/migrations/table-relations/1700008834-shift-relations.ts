import { Migration } from '@libs/common/interfaces'
import { Pool } from 'pg'


const createShiftRelationsQuery = `
ALTER TABLE shifts
    ADD CONSTRAINT shifts_shift_type_id_fkey FOREIGN KEY (shift_type_id)
    REFERENCES shift_types (shift_type_id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT;
`

const dropShiftRelationsQuery = `
ALTER TABLE shifts DROP CONSTRAINT IF EXISTS shifts_shift_type_id_fkey;
`

export class ShiftRelations implements Migration {

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

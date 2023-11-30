import { Migration } from '@libs/common/interfaces'
import { Pool, QueryResult } from 'pg'


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

  public up(): Promise<QueryResult> {
    console.log('ShiftRelations.up')
    return this.pool.query(createShiftRelationsQuery)
  }

  public down(): Promise<QueryResult> {
    console.log('ShiftRelations.down')
    return this.pool.query(dropShiftRelationsQuery)
  }

}

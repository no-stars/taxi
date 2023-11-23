import { Pool } from 'pg'
import {
  PgShiftTypeRepositoryAdapter,
} from '@infrastructure/persistence/pg/repository/shift-type-repository.adapter'
import shiftTypeRows from '@infrastructure/persistence/pg/seeders/shift-types.json'
import { StringUtils } from '@libs/common/utils'

export class ShiftTypeSeed {

  private readonly shiftTypeRepo: PgShiftTypeRepositoryAdapter

  constructor(private readonly pool: Pool) {
    this.shiftTypeRepo = new PgShiftTypeRepositoryAdapter(this.pool)
  }

  public async execute(): Promise<void> {
    console.log('ShiftTypeSeed start')

    for (const shiftTypeRow of shiftTypeRows) {
      const shiftType = {
        shift_type_id: StringUtils.uuid(),
        shift_name: shiftTypeRow.shift_name,
        price: shiftTypeRow.price,
        working_hours: shiftTypeRow.working_hours,
        created_at: new Date(),
        updated_at: null,
        deleted_at: null,
      }

      await this.shiftTypeRepo.addShiftType(shiftType)
    }

    console.log('ShiftTypeSeed finished')
  }


}

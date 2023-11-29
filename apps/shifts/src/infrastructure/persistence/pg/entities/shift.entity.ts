import { Expose } from 'class-transformer'
import { Nullable } from '@libs/common/types/nullable'

export type PgShiftField = string | Date | null

export default class ShiftEntity {

  @Expose({ name: 'shift_id' })
  id: string

  driver_id: string

  shift_type_id: string

  payment_id: string

  created_at: Date

  updated_at: Date

  deleted_at: Nullable<Date>

  getValues(): PgShiftField[] {
    return [
      this.id,
      this.driver_id,
      this.shift_type_id,
      this.payment_id,
      this.created_at,
      this.updated_at,
      this.deleted_at,
    ]
  }

}

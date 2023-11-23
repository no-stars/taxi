import { Expose } from 'class-transformer'
import { Nullable } from '@libs/common/types/nullable'

export type PgShiftTypeField = string | Date | number | null

export default class PgShiftTypeEntity {

  @Expose({ name: 'shift_type_id' })
  id: string

  shift_name: string

  price: number

  working_hours: number

  created_at: Date

  updated_at: Date

  deleted_at: Nullable<Date>

  getValues(): PgShiftTypeField[] {
    return [
      this.id,
      this.shift_name,
      this.price,
      this.working_hours,
      this.created_at,
      this.updated_at,
      this.deleted_at,
    ]
  }

}

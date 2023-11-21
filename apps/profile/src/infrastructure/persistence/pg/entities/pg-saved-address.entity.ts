import { Expose } from 'class-transformer'
import { Nullable } from '@libs/common/types/nullable'

export type PgSavedAddressField = string | Date | null

export default class PgSavedAddressEntity {

  @Expose({ name: 'saved_address_id' })
  id: string

  address_name: string

  passenger_id: string

  coordinates: string

  created_at:  Nullable<Date>

  updated_at:  Nullable<Date>

  deleted_at:  Nullable<Date>

  getValues(): PgSavedAddressField[] {
    return [
      this.id,
      this.address_name,
      this.passenger_id,
      this.coordinates,
      this.created_at,
      this.updated_at,
      this.deleted_at,
    ]
  }

}

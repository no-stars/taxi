import { ApiProperty } from '@nestjs/swagger'


class SavedAddressDto {

  @ApiProperty()
  savedAddressId: string

  @ApiProperty()
  addressName: string

  @ApiProperty()
  passengerId: string

  @ApiProperty()
  latitude: string

  @ApiProperty()
  longitude: string

}

export class FindPassengerSavedAddressResponseBody {

  @ApiProperty({ type: [SavedAddressDto] })
  addresses: SavedAddressDto

}

import { ApiProperty } from '@nestjs/swagger'


export class CreateSavedAddressResponseBody {

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

import { ApiProperty } from '@nestjs/swagger'


export class CreatePassengerResponseBody {

  @ApiProperty()
  personId: string

  @ApiProperty()
  accountId: string

  @ApiProperty()
  firstName: string

  @ApiProperty()
  passengerId: string

}

import { ApiProperty } from '@nestjs/swagger'


export class FindPersonPassengerResponseBody {

  @ApiProperty()
  passengerId: string

  @ApiProperty()
  personId: string

}

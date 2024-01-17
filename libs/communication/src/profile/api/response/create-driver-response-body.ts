import { ApiProperty } from '@nestjs/swagger'


export class CreateDriverResponseBody {

  @ApiProperty()
  personId: string

  @ApiProperty()
  accountId: string

  @ApiProperty()
  firstName: string

  @ApiProperty()
  lastName: string

  @ApiProperty()
  middleName: string

  @ApiProperty()
  driverId: string

}

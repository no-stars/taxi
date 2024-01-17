import { ApiProperty } from '@nestjs/swagger'


export class FindPersonResponseBody {

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

}

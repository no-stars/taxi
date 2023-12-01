import { ApiProperty } from '@nestjs/swagger'


export class FindPersonDriverResponseBody {

  @ApiProperty()
  driverId: string

  @ApiProperty()
  personId: string

}

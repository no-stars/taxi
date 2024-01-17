import { ApiProperty } from '@nestjs/swagger'


export class ConfirmPhoneResponseBody {

  @ApiProperty()
  accessToken: string

}
